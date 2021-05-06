import * as React from "react";
import { Helmet } from "react-helmet-async";

import { ScrollToTop } from "mwap";

import "normalize-css/normalize.css";

import "./styles/global.css";

const App = ({ children }) => {
  return (
    <>
      <ScrollToTop />

      <Helmet>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      <React.Suspense fallback="">{children}</React.Suspense>
    </>
  );
};

export default App;
