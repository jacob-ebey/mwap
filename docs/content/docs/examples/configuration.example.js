const path = require("path");

const getJsTsRules = require("mwap/lib/utils/get-jsts-rules");
const getStyleRules = require("mwap/lib/utils/get-style-rules");

module.exports = {
  /**
   * Modify the webpack configuration
   *
   * @param {import("webpack").Configuration} config The base webpack config.
   * @param {import("@mwap/types").BuildArgs} args Args like "isServer" and such.
   * @param {import("webpack")} webpack Use this webpack instance instead of importing webpack yourself.
   * @returns {import("webpack").Configuration}
   */
  webpack(config, args, webpack) {
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
