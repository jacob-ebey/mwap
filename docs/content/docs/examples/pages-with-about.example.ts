import type { Page } from "mwap";

import Home from "./home";
import Post from "./post";

const pages: Page[] = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
  {
    component: Post,
    path: "/post/:id",
  },
];

export default pages;
