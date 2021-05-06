import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";

import { urlencoded } from "body-parser";
import Router from "express-promise-router";
import stringify from "json-stringify-deterministic";

import { matchPath } from "react-router-dom";

import { createLoaderContext, render } from "@mwap/server";

import type { StartArgs } from "@mwap/types";

global.Buffer = global.Buffer || require("buffer").Buffer;

if (typeof btoa === "undefined") {
  global.btoa = function (str) {
    return new Buffer(str, "binary").toString("base64");
  };
}

if (typeof atob === "undefined") {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, "base64").toString("binary");
  };
}

declare function __non_webpack_require__(id: string): any;

export const createApp = (express: any, args: StartArgs) => {
  const router: any = Router();

  router.use(urlencoded({ extended: false }));

  router.use("/.mwap/loader/:loader/:params", async (req, res) => {
    const loaderContext = createLoaderContext();
    const loader = req.params.loader.toString();
    const paramsJson = atob(
      req.params.params.toString().replace(/\.json$/, "")
    );

    const params = JSON.parse(paramsJson);
    const data = await loaderContext.getData(loader, params);

    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(data));
  });

  const clientPath = path.resolve(args.cwd, args.dist, "client");
  router.use("/.mwap", express.static(clientPath, { fallthrough: false }));

  const publicPath = path.resolve(args.cwd, "public");
  router.use("/", express.static(publicPath));

  const statsPath = path.resolve(args.cwd, args.dist, "server/stats.json");

  router.use(async (req, res, next) => {
    // @ts-ignore
    const mwapPagesModule = require("mwap-pages");
    const mwapPages = mwapPagesModule?.default || mwapPagesModule;

    let routePath;
    for (let i = 0; i < mwapPages.length; i++) {
      routePath = matchPath(req.path, mwapPages[i]);
      if (routePath) break;
    }

    if (!routePath) {
      next();
      return;
    }

    const devStats = (res as any)?.locals?.webpack?.devMiddleware?.stats?.toJson();
    const stats = devStats || __non_webpack_require__(statsPath);

    const loaderContext = createLoaderContext();
    const html = await render({
      location: req.url,
      loaderContext,
      stats,
    });

    if ((args as any).static) {
      const promises = [];
      loaderContext.loaderCache.forEach((value, id) => {
        const { id: loader, params } = JSON.parse(id);
        const filename = path.resolve(
          args.cwd,
          (args as any).static,
          ".mwap/loader",
          loader,
          btoa(stringify(params)) + ".json"
        );

        promises.push(
          fsExtra
            .ensureDir(path.dirname(filename))
            .then(() =>
              fs.promises.writeFile(
                filename,
                JSON.stringify(value.preRenderData)
              )
            )
        );
      });
      await Promise.all(promises);
    }

    res.setHeader("content-type", "text/html");
    res.send(html);
  });

  const app = express();
  app.use(router);

  return app;
};
