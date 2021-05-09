import type { FC } from "react";
import * as React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { useLoader } from "mwap";

import type { HomePageData } from "../loaders/home";

import styles from "./home.module.scss";

const HomePage: FC = () => {
  const { name } = useLoader<HomePageData>("home");
  const [count, setCount] = useState(5);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <h1 className={styles.intro}>Hello 2, {name}!</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </>
  );
};

export default HomePage;
