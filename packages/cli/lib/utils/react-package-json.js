const fs = require("fs");
const path = require("path");

function readPackageJson(cwd) {
  return fs.promises
    .readFile(path.resolve(cwd, "package.json"), "utf8")
    .then((json) => JSON.parse(json));
}

module.exports = readPackageJson;
