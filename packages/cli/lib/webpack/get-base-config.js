const path = require("path");
const webpack = require("webpack");

const { ESBuildMinifyPlugin } = require("esbuild-loader");

const findAllNodeModules = require("../utils/find-all-node-modules");
const resolveEntry = require("../utils/resolve-entry");
const resolveTsconfig = require("../utils/resolve-tsconfig");

/**
 * @returns {Promise<import("webpack").Configuration>}
 */
async function getBaseConfig({ cwd, mode }) {
  const isProd = mode !== "development";

  const [
    userNodeModules,
    cliNodeModules,
    tsconfig,
    mwapApp,
    mwapPages,
  ] = await Promise.all([
    findAllNodeModules(cwd),
    findAllNodeModules(__dirname),
    resolveTsconfig(cwd, isProd),
    resolveEntry(path.resolve(cwd, "app")).then(
      (r) => r || path.resolve(__dirname, "../../runtime/passthrough-app")
    ),
    resolveEntry(path.resolve(cwd, "pages/index")),
  ]);

  const nodeModules = Array.from(
    new Set([...userNodeModules, ...cliNodeModules])
  );

  const tsconfigRaw = tsconfig ? require(tsconfig) : undefined;

  return {
    mode: isProd ? "production" : "development",
    devtool: isProd ? "source-map" : "inline-source-map",
    context: path.resolve(cwd),
    resolve: {
      modules: [...nodeModules, "node_modules"],
      extensions: [
        ".mjs",
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".json",
        ".css",
        ".scss",
        ".sass",
      ],
      alias: {
        "mwap-app": mwapApp,
        "mwap-pages": mwapPages,
      },
    },
    resolveLoader: {
      modules: [...nodeModules],
      alias: {
        "proxy-loader": require.resolve("./proxy-loader"),
      },
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: "es2015",
          css: true,
        }),
      ],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(isProd ? "production" : "development"),
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          include: [
            path.resolve(cwd, "components/async"),
            path.resolve(cwd, "pages"),
          ],
          exclude: [/node_modules/, mwapPages],
          loader: require.resolve("@mwap/async/webpack-loader"),
        },
        {
          enforce: "pre",
          test: /\.ts$/,
          resolve: { mainFields: ["module", "jsnext:main", "browser", "main"] },
          type: "javascript/auto",
          loader: require.resolve("esbuild-loader"),
          options: {
            loader: "ts",
            target: "es2015",
            tsconfigRaw,
          },
        },
        {
          enforce: "pre",
          test: /\.tsx$/,
          resolve: { mainFields: ["module", "jsnext:main", "browser", "main"] },
          type: "javascript/auto",
          loader: require.resolve("esbuild-loader"),
          options: {
            loader: "tsx",
            target: "es2015",
            tsconfigRaw,
          },
        },
        {
          enforce: "pre",
          test: /\.m?js?$/,
          resolve: { mainFields: ["module", "jsnext:main", "browser", "main"] },
          type: "javascript/auto",
          loader: require.resolve("esbuild-loader"),
          options: {
            loader: "js",
            target: "es2015",
          },
        },
        {
          enforce: "pre",
          test: /\.jsx?$/,
          resolve: { mainFields: ["module", "jsnext:main", "browser", "main"] },
          type: "javascript/auto",
          loader: require.resolve("esbuild-loader"),
          options: {
            loader: "jsx",
            target: "es2015",
          },
        },
      ],
    },
  };
}

module.exports = getBaseConfig;
