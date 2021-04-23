import * as React from "react";
import { Suspense } from "react";

import { Head } from "@mwap/head";
import { ScrollToTop } from "@mwap/router";

import Header from "./components/header";
import Meta from "./components/meta";

import "./styles/global.css";

const App = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Head
        htmlAttributes={{ lang: "en" }}
        defaultTitle="@mwap docs"
        titleTemplate="%s | @mwap docs"
      >
        <meta
          name="description"
          content="An example demonstrating tailwindcss within the @mwap framework."
        />
      </Head>

      <Meta />

      <Header />

      <Suspense fallback={""}>{children}</Suspense>
    </>
  );
};

export default App;
