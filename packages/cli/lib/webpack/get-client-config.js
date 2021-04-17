const path = require("path");

const webpack = require("webpack");
const { StatsWriterPlugin } = require("webpack-stats-plugin");

const getBaseConfig = require("./get-base-config");
const resolveEntry = require("../utils/resolve-entry");

/**
 * @param {import("../../types/args").BuildArgs}
 * @returns {Promise<import("webpack").Configuration>}
 */
async function getClientConfig(args) {
  const isProd = args.mode !== "development";

  const [config, entry] = await Promise.all([
    getBaseConfig(args),
    resolveEntry(path.resolve(args.cwd, "client")).then(
      (r) => r || path.resolve(__dirname, "../../runtime/client")
    ),
  ]);

  config.entry = [entry];

  config.output = {
    path: path.resolve(args.cwd, args.dist, "client"),
    publicPath: "/.mwap/",
  };

  config.plugins.push(
    new StatsWriterPlugin({
      filename: "../server/stats.json",
    })
  );

  if (!isProd) {
    config.entry = ["webpack-hot-middleware/client", ...config.entry];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
}

module.exports = getClientConfig;
