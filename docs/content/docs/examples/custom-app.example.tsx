import * as React from "react";
import { Suspense } from "react";
import { Helmet } from "react-helmet-async";

import { ScrollToTop } from "mwap";

import Header from "./components/header";

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
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Helmet>

      <Header />

      {/* Provide a global page loading state through the fallback ;) */}
      <Suspense fallback={""}>{children}</Suspense>
    </>
  );
};

export default App;
