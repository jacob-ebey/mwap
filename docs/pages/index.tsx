import * as React from "react";

import type { Page } from "@mwap/app";
import { dynamic } from "@mwap/async";

import Docs from "./docs";
import Home from "./home";

const DocsWithData = dynamic(async () => {
  // @ts-ignore
  const Component = (await import("../content/docs/intro.md")).default;

  return () => {
    return (
      <Docs components={null}>
        <Component />
      </Docs>
    );
  };
});

const pages: Page[] = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
  {
    component: DocsWithData,
    path: "/docs",
  },
];

export default pages;
