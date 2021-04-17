import * as React from "react";
import { Fragment, Suspense } from "react";

import Header from "./components/header";

const App = ({ children }) => {
  return (
    <Fragment>
      <Header />

      <Suspense fallback={""}>{children}</Suspense>
    </Fragment>
  );
};

export default App;
