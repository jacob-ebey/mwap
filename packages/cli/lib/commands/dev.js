require("source-map-support").install();

const path = require("path");

const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const getClientConfig = require("../webpack/get-client-config");
const getServerConfig = require("../webpack/get-server-config");

function clearRequireCache() {
  Object.keys(require.cache).forEach((key) => {
    if (!key.match(/node_modules\//)) {
      delete require.cache[key];
    }
  });
}

/**
 * @param {import("../../types/args").DevArgs} args
 */
async function dev(args) {
  process.env.NODE_ENV =
    process.env.NODE_ENV || args.mode !== "development"
      ? "production"
      : "development";

  const [clientConfig, serverConfig] = await Promise.all([
    getClientConfig(args),
    getServerConfig(args),
  ]);

  serverConfig.output.publicPath = "/.mwap/server-build";

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  const app = express();

  app.use(
    webpackDevMiddleware(serverCompiler, {
      serverSideRender: true,
      writeToDisk: true,
    })
  );

  app.use(
    webpackDevMiddleware(clientCompiler, {
      serverSideRender: true,
      writeToDisk: false,
    })
  );
  app.use(webpackHotMiddleware(clientCompiler));

  app.use((...params) => {
    if (params[0].path === "/__webpack_hmr") {
      return;
    }

    clearRequireCache();

    const serverPath = path.resolve(args.cwd, args.dist, "server/main.js");
    const serverBuild = require(serverPath);

    Promise.resolve(serverBuild.createApp(express, args))
      .then((app) => app(...params))
      .catch((err) => {
        params[1].status(500);
        params[1].send(err.toString());
      });
  });

  app.listen(args.port, () => {
    console.log(`App started at http://localhost:${args.port}`);
  });
}

module.exports = dev;
