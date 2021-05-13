const path = require("path");
const webpack = require("webpack");

const fileExists = require("./file-exists");

async function applyUserConfig(args, webpackConfig) {
  const configPath = path.resolve(args.cwd, "mwap.config.js");

  let userConfig;
  try {
    if (await fileExists(configPath)) {
      userConfig = require(configPath);
    }
  } catch (_) {}

  if (userConfig) {
    if (userConfig.webpack) {
      await userConfig.webpack(webpackConfig, args, webpack);
    }
  }
}

module.exports = applyUserConfig;
