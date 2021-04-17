import type { FC } from "react";
import * as React from "react";
import { useState } from "react";

import { useLoader } from "@mwap/loaders";

import type { AboutPageData } from "../loaders/about";

const AboutPage: FC = () => {
  const { message } = useLoader<AboutPageData>("about");
  const [count, setCount] = useState(5);

  return (
    <div>
      <h1>{message}</h1>
      
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
};

export default AboutPage;
