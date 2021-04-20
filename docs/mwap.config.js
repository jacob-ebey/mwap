module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        {
          loader: require.resolve("esbuild-loader"),
          options: {
            loader: "jsx",
            target: "es2015",
          },
        },
        {
          loader: "markdown-component-loader",
        },
      ],
    });

    return config;
  },
};
