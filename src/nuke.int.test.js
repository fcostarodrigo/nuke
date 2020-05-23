const fs = require("fs").promises;
const path = require("path");
const nuke = require("./nuke");

describe("nuke", () => {
  const testDir = path.join(__dirname, "..", "tests");

  beforeAll(async () => {
    await fs.mkdir(testDir);
  });

  afterEach(async () => {
    await fs.unlink(path.join(testDir, "folderC", "fileC")).catch(() => {});
    await fs.unlink(path.join(testDir, "fileB")).catch(() => {});
    await fs.unlink(path.join(testDir, "fileA")).catch(() => {});
    await fs.rmdir(path.join(testDir, "folderC")).catch(() => {});
    await fs.rmdir(testDir).catch(() => {});
  });

  it("should remove folders with files inside", async () => {
    await fs.mkdir(path.join(testDir, "folderC"));
    await fs.writeFile(path.join(testDir, "fileA"), "test");
    await fs.writeFile(path.join(testDir, "fileB"), "test");
    await fs.writeFile(path.join(testDir, "folderC", "fileC"), "test");

    await nuke(testDir);
    return expect(fs.access(testDir)).rejects.toThrow();
  });
});
