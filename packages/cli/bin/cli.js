#!/usr/bin/env node
const sade = require("sade");

const build = require("../lib/commands/build");
const dev = require("../lib/commands/dev");
const start = require("../lib/commands/start");

const pkg = require("../package.json");

const prog = sade(pkg.name).version(pkg.version);

prog
  .command("build")
  .describe("Build your project for production.")
  .option(
    "--cwd",
    "The current working directory to build your app from",
    process.cwd()
  )
  .option(
    "--dist",
    "The distribution directory that files will be built into",
    ".mwap"
  )
  .option("--mode", "Either 'production' or 'development'", "production")
  .option(
    "--analyze",
    "Analyze the client bundle with webpack-bundle-analyzer? This will open a browser window",
    false
  )
  .option(
    "--inspect",
    "Inspect the client bundle for potential performance improvments?",
    false
  )
  .option("--verbose", "Enable more verbose logging?", false)
  .action(build);

prog
  .command("dev")
  .describe("Run your project in dev mode.")
  .option(
    "--cwd",
    "The current working directory to run your app from",
    process.cwd()
  )
  .option(
    "--dist",
    "The distribution directory that files will be built into",
    ".mwap"
  )
  .option("--mode", "Either 'production' or 'development'", "development")
  .option("--port", "The port to start the server on", 5000)
  .option(
    "--analyze",
    "Analyze the client bundle with webpack-bundle-analyzer? This will open a browser window",
    false
  )
  .option(
    "--inspect",
    "Inspect the client bundle for potential performance improvments?",
    false
  )
  .option("--verbose", "Enable more verbose logging?", false)
  .action(dev);

prog
  .command("start")
  .describe("Run your build.")
  .option(
    "--cwd",
    "The current working directory to run your app from",
    process.cwd()
  )
  .option(
    "--dist",
    "The distribution directory that files will be built into",
    ".mwap"
  )
  .option("--mode", "Either 'production' or 'development'", "production")
  .option("--port", "The port to start the server on", 5000)
  .action(start);

prog.parse(process.argv);
