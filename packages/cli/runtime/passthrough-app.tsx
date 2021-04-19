import * as React from "react";
import { Fragment } from "react";

import { Head } from "@mwap/head";

const App = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {children}
    </Fragment>
  );
};

export default App;
