const path = require("path");

const getBaseConfig = require("./get-base-config");
const resolveEntry = require("../utils/resolve-entry");

/**
 * @returns {Promise<import("webpack").Configuration>}
 */
async function getServerConfig(args) {
  const [config, mwapDocument, mwapLoaders] = await Promise.all([
    getBaseConfig(args),
    resolveEntry(path.resolve(args.cwd, "document")).then(
      (r) => r || path.resolve(__dirname, "../../runtime/document")
    ),
    resolveEntry(path.resolve(args.cwd, "loaders/index")).then(
      (r) => r || path.resolve(__dirname, "../../runtime/empty-loaders")
    ),
  ]);

  config.target = "node";
  config.output = {
    library: { type: "commonjs" },
    path: path.resolve(args.cwd, args.dist, "server"),
  };

  config.resolve.alias["mwap-document"] = mwapDocument;
  config.resolve.alias["mwap-loaders"] = mwapLoaders;

  config.externals = {
    express: "commonjs express",
  };

  config.entry = [path.resolve(__dirname, "../../runtime/express")];

  return config;
}

module.exports = getServerConfig;
