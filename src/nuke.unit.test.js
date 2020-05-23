/** @typedef {{promises: {unlink: jest.Mock, rmdir: jest.Mock}}} mockedFs */

const walk = /** @type {jest.Mock} */ (require("@fcostarodrigo/walk"));
const fs = /** @type {mockedFs} */ (/** @type {unknown} */ (require("fs")));
const nuke = require("./nuke");

jest.mock("@fcostarodrigo/walk", () => jest.fn());
jest.mock("fs", () => ({ promises: { unlink: jest.fn(), rmdir: jest.fn() } }));

describe("nuke", () => {
  it("should throw the error thrown by walk", () => {
    const error = new Error();
    walk.mockImplementationOnce(() => {
      throw error;
    });

    return expect(nuke(".")).rejects.toBe(error);
  });

  it("should throw the error thrown by unlink", () => {
    const error = new Error();
    walk.mockReturnValueOnce(["path"]);
    fs.promises.unlink.mockRejectedValueOnce(error);

    return expect(nuke(".")).rejects.toBe(error);
  });

  it("should throw the error thrown by rmdir", () => {
    const error = new Error();
    walk.mockReturnValueOnce(["path"]);
    fs.promises.unlink.mockRejectedValueOnce({ code: "EISDIR" });
    fs.promises.rmdir.mockRejectedValueOnce(error);

    return expect(nuke(".")).rejects.toBe(error);
  });
});
