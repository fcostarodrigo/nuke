const fs = require("fs");
const walk = require("@fcostarodrigo/walk");
const nuke = require("./nuke");

jest.mock("@fcostarodrigo/walk", () => jest.fn());
jest.mock("fs", () => ({ promises: { unlink: jest.fn(), rmdir: jest.fn() } }));

describe("nuke", () => {
  it("should throw the error thrown by unlink", () => {
    const error = new Error();
    fs.promises.unlink.mockRejectedValueOnce(error);
    walk.mockReturnValueOnce(["path"]);
    return expect(nuke()).rejects.toBe(error);
  });

  it("should throw the error thrown by rmdir", () => {
    const error = new Error();
    fs.promises.unlink.mockRejectedValueOnce({ code: "EISDIR" });
    fs.promises.rmdir.mockRejectedValueOnce(error);
    walk.mockReturnValueOnce(["path"]);
    return expect(nuke()).rejects.toBe(error);
  });
});
