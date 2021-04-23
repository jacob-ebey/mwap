const fs = require("fs");
const path = require("path");

async function loadPaths() {
  const paths = ["/", "/docs"];

  const docs = await fs.promises.readdir(
    path.resolve(__dirname, "content/docs")
  );

  docs.forEach((file) => {
    if (file.endsWith(".mdx")) {
      paths.push(`/docs/${file.substring(0, file.length - 4)}`);
    }
  });

  return paths;
}

module.exports = loadPaths;
