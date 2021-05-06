import * as React from "react";
import { useMemo } from "react";
import type { ComponentType, FC } from "react";

import { Route, Switch } from "react-router-dom";

import { ErrorBoundary } from "./error-boundary";
import type { Page } from "./page";

// @ts-ignore
let mwapAppModule = require("mwap-app");
// @ts-ignore
let mwapPagesModule = require("mwap-pages");

export const AppShell: FC = () => {
  const App: ComponentType =
    (mwapAppModule && mwapAppModule.default) || mwapAppModule;

  const mwapPages: Page[] =
    (mwapPagesModule && mwapPagesModule.default) || mwapPagesModule;
  const routes = useMemo(
    () =>
      mwapPages.map((page) => (
        <Route
          key={page.path}
          component={page.component}
          exact={page.exact}
          path={page.path}
        />
      )),
    [mwapPages]
  );

  return (
    <ErrorBoundary>
      <App>
        <Switch>{routes}</Switch>
      </App>
    </ErrorBoundary>
  );
};
