import type { FC } from "react";
import * as React from "react";
import { useState } from "react";

import { Head } from "@mwap/head";
import { useLoader } from "@mwap/loaders";

import type { AboutPageData } from "../loaders/about";

import styles from "./about.module.css";

const AboutPage: FC = () => {
  const { message } = useLoader<AboutPageData>("about");
  const [count, setCount] = useState(5);

  return (
    <>
      <Head>
        <title>About</title>
      </Head>

      <h1 className={styles.intro}>{message}</h1>

      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </>
  );
};

export default AboutPage;
