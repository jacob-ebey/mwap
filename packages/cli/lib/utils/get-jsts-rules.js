function getJsTsRules(config) {
  return config.module.rules.filter((rule) => {
    return (
      rule &&
      rule.test &&
      rule.test.toString &&
      rule.test.toString().match(/\\\.(m\??)?[tjm\[](tj\])?sx?\??\$\//)
    );
  });
}

module.exports = getJsTsRules;
