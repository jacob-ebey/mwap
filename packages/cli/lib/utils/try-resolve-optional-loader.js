function tryResolveOptionalLoader(name) {
  try {
    return require.resolve(name);
  } catch (e) {
    return name;
  }
}

module.exports = tryResolveOptionalLoader;
