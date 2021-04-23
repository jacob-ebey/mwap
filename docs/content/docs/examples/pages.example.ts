import type { Page } from "@mwap/app";

import Home from "./home";

const pages: Page[] = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
];

export default pages;
