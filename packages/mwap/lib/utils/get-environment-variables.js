const dotenv = require("dotenv").config();

function getEnvironmentVariables() {
  return Object.entries(dotenv.parsed).reduce(
    (acc, curr) => ({ ...acc, [`${curr[0]}`]: JSON.stringify(curr[1]) }),
    {}
  );
}

module.exports = getEnvironmentVariables;
