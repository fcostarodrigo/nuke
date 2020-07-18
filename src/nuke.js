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
    try {
      await fs.promises.unlink(file);
    } catch (error) {
      await fs.promises.rmdir(file);
    }
  }
}

module.exports = nuke;
