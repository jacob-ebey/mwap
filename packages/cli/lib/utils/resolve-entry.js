const path = require("path");

const exists = require("./file-exists");

const defaultExtensions = [".js", ".jsx", ".ts", ".tsx"];

async function resolveEntry(base) {
  for (const ext of defaultExtensions) {
    const filepath = `${base}${ext}`;
    if (await exists(filepath)) {
      return filepath;
    }
  }
}

module.exports = resolveEntry;
