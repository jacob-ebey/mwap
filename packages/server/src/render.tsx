import type { ComponentType } from "react";
import * as React from "react";
import { Suspense } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderToStringAsync } from "react-async-ssr";

import { AppShell } from "@mwap/app";
import { AsyncProvider } from "@mwap/async";
import { HeadProvider, FilledContext } from "@mwap/head";
import { LoaderProvider } from "@mwap/loaders";
import { StaticRouter } from "@mwap/router";

import type { ClientBuildStats } from "./document";
import { DocumentProvider } from "./document";
import { createLoaderContext } from "./loaders";

// @ts-ignore
const mwapDocumentModule = require("mwap-document");
const Document: ComponentType =
  (mwapDocumentModule && mwapDocumentModule.default) || mwapDocumentModule;

export type RenderOptions = {
  location: string;
  search: string;
  stats: ClientBuildStats;
};

export const render = async ({ location, search, stats }: RenderOptions) => {
  const loaderContext = createLoaderContext();
  const chunks = new Set<string>();
  const head = {} as FilledContext;

  const appHtml: string = await renderToStringAsync(
    <Suspense fallback={""}>
      <AsyncProvider chunks={chunks}>
        <HeadProvider context={head}>
          <StaticRouter location={location}>
            <LoaderProvider getData={loaderContext.getData} search={search}>
              <AppShell />
            </LoaderProvider>
          </StaticRouter>
        </HeadProvider>
      </AsyncProvider>
    </Suspense>,
    {}
  );

  const html = renderToStaticMarkup(
    <DocumentProvider
      appHtml={appHtml}
      chunks={chunks}
      helmet={head.helmet}
      loaderCache={loaderContext.loaderCache}
      stats={stats}
    >
      <Document />
    </DocumentProvider>
  );

  return `<!DOCTYPE html>\n${html}`;
};
