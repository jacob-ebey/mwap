const fs = require("fs");
const path = require("path");

const fsExtra = require("fs-extra");
const express = require("express");
const supertest = require("supertest");

const { parse } = require("../utils/html-utils");

/**
 *
 * @param {import("../../types/args").StartArgs} args
 */
async function staticExport(args) {
  const serverPath = path.resolve(args.cwd, args.dist, "server/main.js");
  const serverBuild = require(serverPath);

  const staticExportsModPath = path.resolve(args.cwd, "static-exports.js");
  const staticExportsMod = require(staticExportsModPath);

  const staticExports = await (typeof staticExportsMod === "function"
    ? staticExportsMod()
    : staticExportsMod);

  await fsExtra.ensureDir(path.resolve(args.cwd, args.static));

  await fsExtra.copy(
    path.resolve(args.cwd, args.dist, "client"),
    path.resolve(args.cwd, args.static, ".mwap")
  );
  await fsExtra
    .pathExists(path.resolve(args.cwd, "public"))
    .then(
      (exists) =>
        exists &&
        fsExtra.copy(
          path.resolve(args.cwd, "public"),
          path.resolve(args.cwd, args.static)
        )
    );

  for (const route of staticExports) {
    const app = await serverBuild.createApp(express, args);
    const htmlFilePath = path.resolve(
      args.cwd,
      args.static,
      route.replace(/^\//, ""),
      "index.html"
    );
    await supertest(app)
      .get(route)
      .expect(200)
      .then((res) => res.text)
      .then(async (html) => {
        await fsExtra.ensureDir(path.dirname(htmlFilePath));
        await fs.promises.writeFile(htmlFilePath, html, "utf8");
      });
  }
}

module.exports = staticExport;
