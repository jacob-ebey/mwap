import type { FC } from "react";
import * as React from "react";
import { useState } from "react";

import { useLoader } from "@mwap/loaders";

import type { HomePageData } from "../loaders/home";

const HomePage: FC = () => {
  const { name } = useLoader<HomePageData>("home");
  const [count, setCount] = useState(5);

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
};

export default HomePage;
