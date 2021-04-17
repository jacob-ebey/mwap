const path = require("path");

const exists = require("./file-exists");

async function resolveTsconfig(cwd, isProd) {
  if (
    await exists(path.resolve(cwd, `tsconfig.${isProd ? "prod" : "dev"}.json`))
  ) {
    return path.resolve(cwd, `tsconfig.${isProd ? "prod" : "dev"}.json`);
  } else if (await exists(path.resolve(cwd, "tsconfig.json"))) {
    return path.resolve(cwd, "tsconfig.json");
  }
}

module.exports = resolveTsconfig;
