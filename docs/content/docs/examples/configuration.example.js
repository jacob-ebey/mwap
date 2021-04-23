const path = require("path");

const getJsTsRules = require("@mwap/cli/lib/utils/get-jsts-rules");
const getStyleRules = require("@mwap/cli/lib/utils/get-style-rules");

module.exports = {
  webpack(config, args) {
    // Use preact in production for smaller bundles
    if (!args.isServer && args.mode === "production") {
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias.react = "preact/compat";
      config.resolve.alias["react-dom"] = "preact/compat";
    }

    // Exclude content directory from base JS/TS and CSS loader rules
    const excludeContentDir = (rule) => {
      rule.exclude = rule.exclude || [];
      rule.exclude.push(path.resolve(args.cwd, "content"));
    };
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
