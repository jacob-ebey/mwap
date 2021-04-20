import * as path from "path";

import Router from "express-promise-router";

import { matchPath } from "@mwap/router";
import { createLoaderContext, render } from "@mwap/server";

import type { StartArgs } from "@mwap/types";

declare function __non_webpack_require__(id: string): any;

// @ts-ignore
const mwapPagesModule = require("mwap-pages");
const mwapPages = mwapPagesModule?.default || mwapPagesModule;

export const createApp = (express: any, args: StartArgs) => {
  const router: any = Router();

  router.use("/.mwap/loaders", async (req, res) => {
    const loaderContext = createLoaderContext();
    const loader = Array.isArray(req.query.loader)
      ? req.query.loader[0].toString()
      : req.query.loader.toString();
    const search = Array.isArray(req.query.search)
      ? req.query.search[0].toString()
      : req.query.search.toString();

    const data = await loaderContext.getData(loader, search);

    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(data));
  });

  const clientPath = path.resolve(args.cwd, args.dist, "client");
  router.use("/.mwap", express.static(clientPath, { fallthrough: false }));

  const publicPath = path.resolve(args.cwd, "public");
  router.use("/", express.static(publicPath));

  const statsPath = path.resolve(args.cwd, args.dist, "server/stats.json");

  router.use(async (req, res, next) => {
    const devStats = (res as any)?.locals?.webpack?.devMiddleware?.stats?.toJson();
    const stats = devStats || __non_webpack_require__(statsPath);

    const protocol = req.protocol || "http";
    const host = req.get("host") || `localhost:${args.port}`;
    const url = new URL(`${protocol}://${host}${req.originalUrl || req.url}`);

    const path = mwapPages.find((page) => matchPath(url.pathname, page));

    if (!path) {
      next();
      return;
    }

    const html = await render({
      location: url.pathname,
      search: url.search,
      stats,
    });

    res.setHeader("content-type", "text/html");
    res.send(html);
  });

  const app = express();
  app.use(router);

  return app;
};
