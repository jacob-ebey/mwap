import type { Page } from "mwap";

import About from "./about";
import Home from "./home";
import Teams from "./teams";

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
  {
    component: Teams,
    path: "/teams",
  },
];

export default pages;
