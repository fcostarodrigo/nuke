const fs = require("fs");
const path = require("path");
const nuke = require("./nuke");

const mkdir = (folder) => fs.promises.mkdir(folder);
const rmdir = (folder) => fs.promises.rmdir(folder);
const writeFile = (file, body = "file") => fs.promises.writeFile(file, body);
const unlink = (file) => fs.promises.unlink(file);
const access = (file) => fs.promises.access(file);
const join = (...paths) => path.join(...paths);

describe("nuke", () => {
  const testDir = path.join(__dirname, "..", "tests");

  beforeEach(async () => {
    try {
      await mkdir(testDir);
      await mkdir(join(testDir, "folderC"));
      await writeFile(join(testDir, "fileA"));
      await writeFile(join(testDir, "fileB"));
      await writeFile(join(testDir, "folderC", "fileC"));
    } catch (error) {} // eslint-disable-line no-empty
  });

  it("should remove folders with files inside", async () => {
    await nuke(testDir);
    return expect(access(testDir)).rejects.toThrow();
  });

  afterEach(async () => {
    try {
      await unlink(join(testDir, "folderC", "fileC"));
      await unlink(join(testDir, "fileB"));
      await unlink(join(testDir, "fileA"));
      await rmdir(join(testDir, "folderC"));
      await rmdir(testDir);
    } catch (error) {} // eslint-disable-line no-empty
  });
});
