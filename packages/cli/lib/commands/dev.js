const path = require("path");

const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const getClientConfig = require("../webpack/get-client-config");
const getServerConfig = require("../webpack/get-server-config");

function clearRequireCache() {
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });
}

/**
 * @param {import("../../types/args").DevArgs} args
 */
async function dev(args) {
  const [clientConfig, serverConfig] = await Promise.all([
    getClientConfig(args),
    getServerConfig(args),
  ]);

  serverConfig.output.publicPath = "/.mwap/server-build";

  const compiler = webpack([clientConfig, serverConfig]);

  const app = express();
  app.use(
    webpackDevMiddleware(compiler, {
      serverSideRender: true,
      writeToDisk: true,
    })
  );

  app.use(webpackHotMiddleware(compiler));

  app.use((req, res, next) => {
    clearRequireCache();
    next();
  });
  app.use((...params) => {
    if (params[0].path === "/__webpack_hmr") {
      return;
    }

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
