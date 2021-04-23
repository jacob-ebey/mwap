import type { Page } from "@mwap/app";

import Docs from "./docs";
import Home from "./home";

const pages: Page[] = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
  {
    component: Docs,
    path: "/docs/:article",
  },
  {
    component: Docs,
    path: "/docs",
  },
];

export default pages;
