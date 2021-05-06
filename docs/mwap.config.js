const path = require("path");

const nodeExternals = require("webpack-node-externals");

const getJsTsRules = require("mwap/lib/utils/get-jsts-rules");
const getStyleRules = require("mwap/lib/utils/get-style-rules");

module.exports = {
  webpack(config, args) {
    if (args.isServer) {
      config.externals = [
        nodeExternals({
          allowlist: [/@mwap\//, "mwap"],
          additionalModuleDirs: [
            path.resolve(__dirname, "../node_modules"),
            path.resolve(__dirname, "../packages"),
          ],
        }),
      ];
    }

    console.log(args.mode, process.env.NODE_ENV);
    // Use preact in production for smaller bundles
    if (!args.isServer && args.mode !== "development") {
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias.react = "preact/compat";
      config.resolve.alias["react-dom"] = "preact/compat";
    }

    const excludeContentDir = (rule) => {
      rule.exclude = rule.exclude || [];
      rule.exclude.push(path.resolve(args.cwd, "content"));
    };
    // Exclude content directory from base JS/TS and CSS loader rules
    getJsTsRules(config).forEach(excludeContentDir);
    getStyleRules(config).forEach(excludeContentDir);

    // Load mdx, js, ts, css, txt and sh files in the content dir as text
    config.module.rules.push({
      test: [/\.mdx?$/, /\.[tj]sx?$/, /\.css$/, /\.txt$/, /\.sh$/],
      include: path.resolve(args.cwd, "content"),
      use: [
        {
          loader: "raw-loader",
        },
      ],
    });

    return config;
  },
};
