import * as React from "react";

import { Head } from "@mwap/head";
import { ScrollToTop } from "@mwap/router";

import "normalize-css/normalize.css";

import "./styles/global.css";

const App = ({ children }) => {
  return (
    <>
      <ScrollToTop />

      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <React.Suspense fallback="">{children}</React.Suspense>
    </>
  );
};

export default App;
