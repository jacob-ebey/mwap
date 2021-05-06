const express = require("express");
const path = require("path");

/**
 *
 * @param {import("../../types/args").StartArgs} args
 */
async function start(args) {
  const serverPath = path.resolve(args.cwd, args.dist, "server/main.js");
  const serverBuild = require(serverPath);

  const app = await serverBuild.createApp(express, args);
  app.listen(args.port, () => {
    console.log(`App started at http://localhost:${args.port}`);
  });
}

module.exports = start;
