import type { ComponentType } from "react";
import * as React from "react";
import { Suspense } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { renderToStringAsync } from "react-async-ssr";
import { HelmetProvider, FilledContext } from "react-helmet-async";
import { StaticRouter } from "react-router-dom";

import { AppShell } from "@mwap/app";
import { AsyncProvider } from "@mwap/async";
import { LoaderProvider } from "@mwap/loaders";

import type { ClientBuildStats } from "./document";
import { DocumentProvider } from "./document";
import { LoadersContext } from "./loaders";

// @ts-ignore
const mwapDocumentModule = require("mwap-document");
const Document: ComponentType =
  (mwapDocumentModule && mwapDocumentModule.default) || mwapDocumentModule;

export type RenderOptions = {
  location: string;
  loaderContext: LoadersContext;
  stats: ClientBuildStats;
};

export const render = async ({
  location,
  loaderContext,
  stats,
}: RenderOptions) => {
  const chunks = new Set<string>();
  const head = {} as FilledContext;

  const appHtml: string = await renderToStringAsync(
    <Suspense fallback={""}>
      <AsyncProvider chunks={chunks}>
        <HelmetProvider context={head}>
          <StaticRouter location={location}>
            <LoaderProvider getData={loaderContext.getData}>
              <AppShell />
            </LoaderProvider>
          </StaticRouter>
        </HelmetProvider>
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
