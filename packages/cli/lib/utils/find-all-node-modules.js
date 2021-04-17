const fs = require("fs");
const path = require("path");

async function findAllNodeModules(startDir) {
  const dirs = [];
  const { root } = path.parse(startDir);
  let dir = path.resolve(startDir);

  while (true) {
    const joined = path.join(dir, "node_modules");

    const exists = fs.promises
      .access(joined, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      dirs.push(joined);
    }
    if (dir === root) {
      return dirs;
    }
    dir = path.dirname(dir);
  }
}

module.exports = findAllNodeModules;
