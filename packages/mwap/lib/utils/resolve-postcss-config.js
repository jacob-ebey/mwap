const path = require("path");

const exists = require("./file-exists");

async function resolvePostCssConfig(cwd) {
  const filepath = path.resolve(cwd, "postcss.config.js");
  if (await exists(filepath)) {
    return filepath;
  }

  return path.resolve(__dirname, "../config/postcss.config.js");
}

module.exports = resolvePostCssConfig;
