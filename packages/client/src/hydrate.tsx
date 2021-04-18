import * as React from "react";
import { Suspense } from "react";
import type { ComponentType } from "react";
import { hydrate as reactHydrate } from "react-dom";

import { AppShell } from "@mwap/app";
import { LoaderProvider } from "@mwap/loaders";
import { BrowserRouter, useLocation } from "@mwap/router";

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
  const location = useLocation();

  return (
    <LoaderProvider getData={getData} search={location.search}>
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

  await Promise.all(
    asyncChunks.map((chunk) => window.__ASYNC_PRELOAD__?.[chunk]?.())
  ).catch((err) => console.error("Error resolving async chunks", err));

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
