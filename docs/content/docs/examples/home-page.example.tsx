import * as React from "react";
import { Head } from "@mwap/head";

const HomePage = () => {
  const [count, setCount] = React.useState(5);
  const handleIncrement = () => setCount(count + 1);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Hello, World!</h1>
      <button onClick={handleIncrement}>Count: {count}</button>
    </>
  );
};

export default HomePage;
