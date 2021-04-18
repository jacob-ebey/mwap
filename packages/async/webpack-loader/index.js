const loaderUtils = require("loader-utils");
const { snakeCase } = require("snake-case");

function pwrcAsyncLoader() {}

pwrcAsyncLoader.pitch = function pitch(request) {
  const componentRequest = loaderUtils.stringifyRequest(this, `!!${request}`);
  const split = request.split("!");
  const baseRequest = split[split.length - 1];
  const relativeRequest = baseRequest.replace(this.rootContext + "/", "");
  const chunkId = snakeCase(relativeRequest);

  const issuer = JSON.stringify(baseRequest);

  const webpackChunkName = JSON.stringify(chunkId);

  return `
import * as React from "react";
import { dynamic } from "@mwap/async";

const DynamicComponent = dynamic(() => import(
  /* webpackChunkName: ${webpackChunkName} */ ${componentRequest}),
  {
    __chunkId: ${webpackChunkName},
    __issuer: require.resolveWeak(${componentRequest})
  }
);

export default function AsyncComponent(props) {
  return React.createElement(DynamicComponent, props);
}
  `;
};

module.exports = pwrcAsyncLoader;
