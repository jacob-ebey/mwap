import type { Page } from "mwap";

import Home from "./home";

const pages: Page[] = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
];

export default pages;
