const fs = require("fs");
const walk = require("@fcostarodrigo/walk");

/**
 * Remove files and folders recursively
 *
 * @param {string} root
 * @returns {Promise<void>}
 */
async function nuke(root) {
  const files = [];
  for await (const file of walk(root, true)) {
    files.push(file);
  }

  for (const file of files.reverse()) {
    const removeDir = error =>
      error.code === "EISDIR" ? fs.promises.rmdir(file) : Promise.reject(error);

    await fs.promises.unlink(file).catch(removeDir);
  }
}

module.exports = nuke;
