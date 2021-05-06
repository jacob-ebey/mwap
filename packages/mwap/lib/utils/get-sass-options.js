function getSassConfiguration(...includePaths) {
  const config = {
    sourceMap: true,
    sassOptions: {
      includePaths,
    },
  };

  Object.defineProperty(config, "includePaths", { value: includePaths });

  return config;
}

module.exports = getSassConfiguration;
