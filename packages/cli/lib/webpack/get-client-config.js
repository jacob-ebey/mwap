const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const WebpackBar = require("webpackbar");

const getBaseConfig = require("./get-base-config");
const resolveEntry = require("../utils/resolve-entry");
const resolvePostCssConfig = require("../utils/resolve-postcss-config");

/**
 * @param {import("../../types/args").BuildArgs}
 * @returns {Promise<import("webpack").Configuration>}
 */
async function getClientConfig(args) {
  const isProd = args.mode !== "development";

  const [config, entry, postcssConfig] = await Promise.all([
    getBaseConfig(args),
    resolveEntry(path.resolve(args.cwd, "client")).then(
      (r) => r || path.resolve(__dirname, "../../runtime/client")
    ),
    resolvePostCssConfig(args.cwd),
  ]);

  config.entry = [entry];

  config.output = {
    path: path.resolve(args.cwd, args.dist, "client"),
    publicPath: "/.mwap/",
  };

  config.module.rules.push({
    test: /\.module\.css$/,
    use: [
      isProd ? MiniCssExtractPlugin.loader : require.resolve("style-loader"),
      {
        loader: require.resolve("css-loader"),
        options: {
          modules: {
            localIdentName: "[local]__[hash:base64:5]",
          },
          importLoaders: 1,
          sourceMap: true,
        },
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          sourceMap: true,
          postcssOptions: {
            config: postcssConfig,
          },
        },
      },
    ],
  });

  if (isProd) {
    config.plugins.push(new MiniCssExtractPlugin());
  }

  config.plugins.push(
    new WebpackBar({
      color: "green",
      name: "client",
      reporters: ["fancy"],
    })
  );

  config.plugins.push(
    new StatsWriterPlugin({
      filename: "../server/stats.json",
      stats: {
        all: true,
      },
    })
  );

  if (!isProd) {
    config.entry = ["webpack-hot-middleware/client", ...config.entry];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (args.analyze) {
    const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
      .BundleAnalyzerPlugin;
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  if (args.inspect) {
    const { DuplicatesPlugin } = require("inspectpack/plugin");
    config.plugins.push(
      new DuplicatesPlugin({
        emitErrors: false,
        verbose: !!args.verbose,
      })
    );
  }

  return config;
}

module.exports = getClientConfig;
