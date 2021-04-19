import type { FC } from "react";
import * as React from "react";
import { useState } from "react";

import { Head } from "@mwap/head";
import { useLoader } from "@mwap/loaders";

import type { HomePageData } from "../loaders/home";

import styles from "./home.module.css";

const HomePage: FC = () => {
  const { name } = useLoader<HomePageData>("home");
  const [count, setCount] = useState(5);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <h1 className={styles.intro}>Hello, {name}!</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </>
  );
};

export default HomePage;
