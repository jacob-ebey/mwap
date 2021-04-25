import * as React from "react";
import { Suspense, useEffect, useState } from "react";

import { Head } from "@mwap/head";
import { ScrollToTop } from "@mwap/router";

import Header from "./components/header";
import Meta from "./components/meta";

import "./styles/global.css";

const App = ({ children }) => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    setDarkModeEnabled(localStorage.getItem("dark-mode") === "true");
  }, []);

  const handleDarkModeToggled = () => {
    const newValue = !darkModeEnabled;
    localStorage.setItem("dark-mode", JSON.stringify(newValue));
    setDarkModeEnabled(newValue);
  };

  return (
    <>
      <ScrollToTop />
      <Head
        htmlAttributes={{
          class: darkModeEnabled ? "dark" : null,
          lang: "en",
        }}
        bodyAttributes={{
          class: "dark:bg-black dark:text-white",
        }}
        defaultTitle="@mwap docs"
        titleTemplate="%s | @mwap docs"
      >
        <meta
          name="description"
          content="An example demonstrating tailwindcss within the @mwap framework."
        />
      </Head>

      <Meta />

      <Header
        darkModeEnabled={darkModeEnabled}
        onDarkModeToggled={handleDarkModeToggled}
      />

      <Suspense fallback={""}>{children}</Suspense>
    </>
  );
};

export default App;
