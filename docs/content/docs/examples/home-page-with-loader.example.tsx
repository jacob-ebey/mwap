import * as React from "react";

import { useLoader } from "mwap";

import type { HomePageData } from "../loaders/home";

const HomePage = () => {
  const { name } = useLoader<HomePageData>("home");

  return <h1>Hello, {name}!</h1>;
};

export default HomePage;
