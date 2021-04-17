import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType, FC } from "react";

import { Route, Switch } from "@mwap/router";

import { ErrorBoundary } from "./error-boundary";
import type { Page } from "./page";

// @ts-ignore
let mwapAppModule = require("mwap-app");
// @ts-ignore
let mwapPagesModule = require("mwap-pages");

export const AppShell: FC = () => {
  // TODO: get some real fast refresh in here to preserve state
  const [, rerender] = useState({});
  useEffect(() => {
    const hotMod: any = module;
    if (hotMod.hot) {
      const doReload = () => {
        // @ts-ignore
        Promise.all([import("mwap-app"), import("mwap-pages")]).then(
          ([appModule, pagesModule]) => {
            mwapAppModule = appModule;
            mwapPagesModule = pagesModule;
            rerender({});
          }
        );
      };
      hotMod.hot.accept(require.resolve("mwap-app"), (...args) => {
        doReload();
      });
      hotMod.hot.accept(require.resolve("mwap-pages"), (...args) => {
        doReload();
      });
    }
  }, []);

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
