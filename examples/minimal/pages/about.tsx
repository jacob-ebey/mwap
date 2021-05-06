import type { FC } from "react";
import * as React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { useLoader } from "mwap";

import type { AboutPageData } from "../loaders/about";

import styles from "./about.module.scss";

const AboutPage: FC = () => {
  const { message } = useLoader<AboutPageData>("about");
  const [count, setCount] = useState(5);

  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>

      <h1 className={styles.intro}>{message}</h1>

      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </>
  );
};

export default AboutPage;
