import * as React from "react";
import { Suspense } from "react";

import { Head } from "@mwap/head";
import { ScrollToTop } from "@mwap/router";

import "./styles/global.css";

const App = ({ children }) => {
  return (
    <>
      <ScrollToTop />

      <Head
        htmlAttributes={{ lang: "en" }}
        defaultTitle="@mwap tailwindcss example"
        titleTemplate="%s | @mwap tailwindcss example"
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
      </Head>

      <Suspense fallback={""}>{children}</Suspense>
    </>
  );
};

export default App;
