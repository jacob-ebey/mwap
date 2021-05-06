import type { Page } from "mwap";

import Home from "./home";
import Todo from "./todo";

const pages: Page[] = [
  {
    component: Home,
    exact: true,
    path: "/",
  },
  {
    component: Todo,
    path: "/todo/:id",
  },
];

export default pages;
