import * as React from "react";
import { Suspense } from "react";
import { hydrate as reactHydrate } from "react-dom";

import { AppShell } from "@mwap/app";
import { LoaderProvider } from "@mwap/loaders";
import { BrowserRouter, useLocation } from "@mwap/router";

import { getData } from "./loaders";

const AppWithLoaders = () => {
  const location = useLocation();

  return (
    <LoaderProvider getData={getData} search={location.search}>
      <AppShell />
    </LoaderProvider>
  );
};

export const hydrate = () => {
  const element = document.getElementById("__mwap__");

  reactHydrate(
    <Suspense fallback={""}>
      <BrowserRouter>
        <AppWithLoaders />
      </BrowserRouter>
    </Suspense>,
    element
  );
};
