const webpack = require("webpack");

const getClientConfig = require("../webpack/get-client-config");
const getServerConfig = require("../webpack/get-server-config");

function printWarnings(compilation) {
  if (compilation && compilation.warnings) {
    compilation.warnings.forEach((warning) => console.warn(warning.toString()));
  }
}

function printErrors(compilation) {
  if (compilation && compilation.errors) {
    compilation.errors.forEach((error) => console.error(error.toString()));
  }
}

/**
 *
 * @param {import("../../types/args").BuildArgs} args
 */
async function build({ _, ...args }) {
  process.env.NODE_ENV =
    process.env.NODE_ENV || args.mode !== "development"
      ? "production"
      : "development";

  const [clientConfig, serverConfig] = await Promise.all([
    getClientConfig(args),
    getServerConfig(args),
  ]);

  await new Promise((resolve, reject) => {
    webpack([clientConfig, serverConfig], (err, stats) => {
      if (err) {
        reject(err);
        return;
      }

      if (stats.hasErrors()) {
        reject(stats);
        return;
      }

      resolve(stats);
    });
  })
    .then((stats) => {
      if (args.verbose) {
        console.info("\n\nClient Build ============");
        printWarnings(stats.stats[0].compilation);
        printErrors(stats.stats[0].compilation);

        console.info("\n\nServer Build ============");
        printWarnings(stats.stats[1].compilation);
        printErrors(stats.stats[1].compilation);

        console.info(stats.toString({ errorDetails: "verbose" }));
      }

      console.log("NO BUILD ERROR");

      process.exit(0);
    })
    .catch((stats) => {
      // TODO: Investigate why I put this here and if it should actually be handled.
      if (typeof stats.constructor === "function") {
        console.log(stats);
      }
      if (
        stats &&
        stats.stats &&
        stats.stats[0] &&
        stats.stats[0].compilation
      ) {
        console.info("\n\nClient Build ============");
        printWarnings(stats.stats[0].compilation);
        printErrors(stats.stats[0].compilation);
      }

      if (
        stats &&
        stats.stats &&
        stats.stats[1] &&
        stats.stats[1].compilation
      ) {
        console.info("\n\nServer Build ============");
        printWarnings(stats.stats[1].compilation);
        printErrors(stats.stats[1].compilation);
      }
      console.log("BUILD ERROR :(!");
      process.exit(1);
    });
}

module.exports = build;
