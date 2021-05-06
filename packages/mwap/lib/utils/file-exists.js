const fs = require("fs");

function fileExists(p) {
  return fs.promises
    .access(p, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

module.exports = fileExists;
