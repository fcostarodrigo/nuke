const nuke = require("./nuke");

describe("nuke", () => {
  it("should throw the error thrown by walk", () => {
    const error = new Error();
    async function* walk() {
      yield "path";
      throw error;
    }

    return expect(nuke(".", walk)).rejects.toBe(error);
  });

  it("should throw the error thrown by unlink", () => {
    const error = new Error();
    async function* walk() {
      yield "path";
    }
    async function unlink() {
      throw error;
    }

    return expect(nuke(".", walk, unlink)).rejects.toBe(error);
  });

  it("should throw the error thrown by rmdir", () => {
    const error = new Error();
    async function* walk() {
      yield "path";
    }
    async function unlink() {
      /** @type {NodeJS.ErrnoException} */
      const notDirectoryError = {
        code: "EISDIR",
        name: "Error",
        message: "EISDIR: illegal operation on a directory, unlink 'path'",
      };
      throw notDirectoryError;
    }
    async function rmdir() {
      throw error;
    }

    return expect(nuke(".", walk, unlink, rmdir)).rejects.toBe(error);
  });
});
