const path = require("path");
const fsExtra = require("fs-extra");

async function getWebpackCacheConfigFiles(cwd) {
  const paths = ["mwap/lib/webpack/get-base-config"];

  const configPath = path.resolve(cwd, "mwap.config.js");
  if (await fsExtra.pathExists(configPath)) {
    paths.push(configPath);
  }

  return paths;
}

module.exports = getWebpackCacheConfigFiles;
