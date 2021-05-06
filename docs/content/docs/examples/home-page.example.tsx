import * as React from "react";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  const [count, setCount] = React.useState(5);
  const handleIncrement = () => setCount(count + 1);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1>Hello, World!</h1>
      <button onClick={handleIncrement}>Count: {count}</button>
    </>
  );
};

export default HomePage;
