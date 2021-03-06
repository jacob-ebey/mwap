import type { Page } from "mwap";

import About from "./about";
import Home from "./home";

const pages: Page[] = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
  {
    component: About,
    path: "/about",
  },
];

export default pages;
