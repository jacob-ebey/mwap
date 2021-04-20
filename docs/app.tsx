import * as React from "react";
import { Fragment, Suspense } from "react";

import { Head } from "@mwap/head";

import Header from "./components/header";
import Meta from "./components/meta";

import "./styles/global.css";

const App = ({ children }) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default App;
