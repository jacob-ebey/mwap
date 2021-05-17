const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const WebpackBar = require("webpackbar");

const applyUserConfig = require("../utils/apply-user-config");
const findAllNodeModules = require("../utils/find-all-node-modules");
const getSassConfiguration = require("../utils/get-sass-options");
const getWebpackCacheConfigFiles = require("../utils/get-webpack-cache-config-files");
const resolveEntry = require("../utils/resolve-entry");
const resolvePostCssConfig = require("../utils/resolve-postcss-config");
const tryResolveOptionalLoader = require("../utils/try-resolve-optional-loader");

const getBaseConfig = require("./get-base-config");

/**
 * @param {import("@mwap/types").BuildArgs}
 * @returns {Promise<import("webpack").Configuration>}
 */
async function getClientConfig(args) {
  const isProd = args.mode !== "development";

  const [userNodeModules, config, entry, postcssConfig] = await Promise.all([
    findAllNodeModules(args.cwd),
    getBaseConfig(args),
    resolveEntry(path.resolve(args.cwd, "client")).then(
      (r) => r || path.resolve(__dirname, "../../runtime/client")
    ),
    resolvePostCssConfig(args.cwd),
  ]);

  config.entry = [entry];

  config.output = {
    path: path.resolve(args.cwd, args.dist, "client"),
    publicPath: args.publicPath,
  };

  config.module.rules.push({
    enforce: "pre",
    test: /\.s[ac]ss$/,
    use: [
      {
        loader: require.resolve("./proxy-loader"),
        options: {
          cwd: args.cwd,
          loader: tryResolveOptionalLoader("sass-loader"),
          options: getSassConfiguration(...userNodeModules),
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.module\.(p?css|s[ac]ss)$/,
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

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    })
  );

  config.module.rules.push({
    test: /\.(p?css|s[ac]ss)$/,
    exclude: [/\.module\.(p?css|s[ac]ss)$/],
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: require.resolve("css-loader"),
        options: {
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

  const mwapEnvVariables = Object.entries(process.env).reduce(
    (acc, [key, val]) => {
      if (key.startsWith("MWAP_")) {
        acc[key] = JSON.stringify(val);
      }
      return acc;
    },
    {}
  );

  if (Object.keys(mwapEnvVariables).length > 0) {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(isProd ? "production" : "development"),
          PUBLIC_PATH: JSON.stringify(args.publicPath || ""),
          ...mwapEnvVariables,
        },
      })
    );
  }

  if (isProd) {
    config.output.filename = "[name].[contenthash].js";
    config.output.chunkFilename = "[id].[contenthash].js";
  } else {
    config.output.filename = "[name].js";
    config.output.chunkFilename = "[id].js";
  }

  if (args.progress) {
    config.plugins.push(
      new WebpackBar({
        color: "green",
        name: "client",
        reporters: ["fancy"],
      })
    );
  }

  config.plugins.push(
    new StatsWriterPlugin({
      filename: "../server/stats.json",
      stats: {
        all: true,
      },
    })
  );

  if (!isProd) {
    // TODO: Figure out a better HMR solution
    config.entry = ["webpack-hot-middleware/client", ...config.entry];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());

    // const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
    // config.plugins.push(
    //   new ReactRefreshWebpackPlugin({
    //     overlay: false,
    //   })
    // );
    // config.module.rules.unshift({
    //   test: /\.[jt]sx?$/,
    // exclude: [/node_modules\/(!?mwap|@mwap)/],
    //   use: [
    //     {
    //       loader: require.resolve("babel-loader"),
    //       options: {
    //         plugins: [require.resolve("react-refresh/babel")],
    //       },
    //     },
    //   ],
    // });
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

  const configFiles = await getWebpackCacheConfigFiles(args.cwd);
  config.cache = {
    name: `client-${args.mode}`,
    type: "filesystem",
    buildDependencies: {
      config: ["mwap/lib/webpack/get-client-config.js", ...configFiles],
    },
  };

  await applyUserConfig(Object.assign({}, args, { isServer: false }), config);

  return config;
}

module.exports = getClientConfig;
