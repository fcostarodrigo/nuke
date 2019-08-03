const fs = require("fs");
const path = require("path");
const nuke = require("./nuke");

describe("nuke", () => {
  const testDir = path.join(__dirname, "..", "tests");
  const ignoreError = () => {};
  const folders = [testDir, path.join(testDir, "folderC")];
  const files = [
    path.join(testDir, "fileA"),
    path.join(testDir, "fileB"),
    path.join(testDir, "folderC", "fileC"),
  ];

  beforeEach(async () => {
    for (const folder of folders) {
      await fs.promises.mkdir(folder).catch(ignoreError);
    }
    for (const file of files) {
      await fs.promises.writeFile(file, "file").catch(ignoreError);
    }
  });

  it("should remove folders with files inside", async () => {
    await nuke(testDir);
    return expect(fs.promises.access(testDir)).rejects.toThrow();
  });

  afterEach(async () => {
    for (const file of files) {
      await fs.promises.unlink(file, "file").catch(ignoreError);
    }
    for (const folder of folders.reverse()) {
      await fs.promises.rmdir(folder).catch(ignoreError);
    }
  });
});
