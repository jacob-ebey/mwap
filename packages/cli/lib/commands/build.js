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
  console.info("Building with args", args);

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
      console.info("\n\nClient Build ============");
      printWarnings(stats.stats[0].compilation);
      printErrors(stats.stats[0].compilation);

      console.info("\n\nServer Build ============");
      printWarnings(stats.stats[1].compilation);
      printErrors(stats.stats[1].compilation);

      console.info(stats.toString({ errorDetails: "verbose" }));
    })
    .catch((stats) => {
      console.info("\n\nClient Build ============");
      printWarnings(stats.stats[0].compilation);
      printErrors(stats.stats[0].compilation);

      console.info("\n\nServer Build ============");
      printWarnings(stats.stats[1].compilation);
      printErrors(stats.stats[1].compilation);

      process.exit(1);
    });
}

module.exports = build;
