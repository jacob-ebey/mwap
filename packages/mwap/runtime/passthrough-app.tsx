import * as React from "react";
import { Fragment } from "react";
import { Helmet } from "react-helmet-async";

import { ScrollToTop } from "mwap";

const App = ({ children }) => {
  return (
    <Fragment>
      <ScrollToTop />

      <Helmet>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {children}
    </Fragment>
  );
};

export default App;
