function getStyleRules(config) {
  return config.module.rules.filter((rule) => {
    return (
      rule &&
      rule.test &&
      rule.test.toString &&
      rule.test.toString().match(/s\[ac\]ss/)
    );
  });
}

module.exports = getStyleRules;
