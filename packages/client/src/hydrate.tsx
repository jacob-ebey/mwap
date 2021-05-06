import * as React from "react";
import { Suspense } from "react";
import type { ComponentType } from "react";
import { hydrate as reactHydrate } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { AppShell } from "@mwap/app";
import { LoaderProvider } from "@mwap/loaders";

import { getData } from "./loaders";

type AsyncPreloads = {
  [id: string]: () => Promise<void>;
  [id: number]: () => Promise<void>;
};

type DynamicComponents = {
  [id: string]: ComponentType<any>;
  [id: number]: ComponentType<any>;
};

declare global {
  interface Window {
    __ASYNC_PRELOAD__: AsyncPreloads;
    __DYNAMIC_COMPONENTS__: DynamicComponents;
  }
}

const AppWithLoaders = () => {
  return (
    <LoaderProvider getData={getData}>
      <AppShell />
    </LoaderProvider>
  );
};

export const hydrate = async () => {
  const asyncChunksElement = document.querySelector(
    `script[type="__ASYNC_CHUNKS__"]`
  );
  const asyncChunks = asyncChunksElement
    ? JSON.parse(decodeURI(asyncChunksElement.innerHTML))
    : [];

  let shouldPreload = new Set<string>(asyncChunks);
  let canPreload = Object.keys(window.__ASYNC_PRELOAD__ || {});
  while (
    shouldPreload.size > 0 &&
    canPreload.some((can) => shouldPreload.has(can))
  ) {
    await Promise.all(
      asyncChunks.map((chunk) => {
        if (window.__ASYNC_PRELOAD__?.[chunk]) {
          shouldPreload.delete(chunk);
          const load = window.__ASYNC_PRELOAD__[chunk];
          delete window.__ASYNC_PRELOAD__[chunk];
          return load().catch((err) =>
            console.error("Error loading chunk", chunk, err)
          );
        }
      })
    );

    canPreload = Object.keys(window.__ASYNC_PRELOAD__ || {});
  }

  const element = document.getElementById("__mwap__");

  reactHydrate(
    <Suspense fallback={""}>
      <HelmetProvider>
        <BrowserRouter>
          <AppWithLoaders />
        </BrowserRouter>
      </HelmetProvider>
    </Suspense>,
    element
  );
};
