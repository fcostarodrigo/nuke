const fs = require("fs");
const originalWalk = require("@fcostarodrigo/walk");

/**
 * Remove files and folders recursively
 *
 * @param {string} root
 * @param {typeof originalWalk} walk
 * @param {typeof fs.promises.unlink} unlink
 * @param {typeof fs.promises.rmdir} rmdir
 * @returns {Promise<void>}
 */
async function nuke(
  root,
  walk = originalWalk,
  unlink = fs.promises.unlink,
  rmdir = fs.promises.rmdir,
) {
  const files = [];
  for await (const file of walk(root, true)) {
    files.push(file);
  }

  for (const file of files.reverse()) {
    await unlink(file).catch((error) =>
      error.code === "EISDIR" ? rmdir(file) : Promise.reject(error),
    );
  }
}

module.exports = nuke;
