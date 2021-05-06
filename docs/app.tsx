import * as React from "react";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";

import { ScrollToTop } from "mwap";

import Header from "./components/header";
import Meta from "./components/meta";

import "./styles/global.css";

const App = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Helmet
        htmlAttributes={{ lang: "en" }}
        defaultTitle="@mwap docs"
        titleTemplate="%s | @mwap docs"
      >
        <meta
          name="description"
          content="An example demonstrating tailwindcss within the @mwap framework."
        />
      </Helmet>

      <Meta />

      <Header />

      <Suspense fallback={""}>{children}</Suspense>
    </>
  );
};

export default App;
