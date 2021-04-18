import type { ComponentType, FC } from "react";
import { createElement, useContext } from "react";

import { context } from "./context";

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

type DefaultModule<T> = { default: T };

type DynamicComponent<TProps> = FC<TProps>;

type InferedModuleProps<TModule> = TModule extends DefaultModule<
  ComponentType<infer TProps>
>
  ? TProps
  : TModule extends ComponentType<infer TProps>
  ? TProps
  : any;

type DynamicOptions = {
  /**
   * This is for internal use. Don't set it unless you know what you are doing. Shit will break.
   */
  __chunkId?: string | number;
  /**
   * Render the component on the server?
   * @default true
   */
  ssr?: boolean;
};

export const dynamic = <
  TModule extends DefaultModule<ComponentType> | ComponentType
>(
  load: () => TModule | Promise<TModule>,
  options: DynamicOptions
): DynamicComponent<InferedModuleProps<TModule>> => {
  let promise: Promise<void>;
  let Component: ComponentType<InferedModuleProps<TModule>> =
    (options?.__chunkId &&
      typeof window !== "undefined" &&
      window.__DYNAMIC_COMPONENTS__?.[options.__chunkId]) ||
    undefined;

  const doLoad = () => {
    if (!promise) {
      promise = Promise.resolve(load()).then((mod: any) => {
        Component = mod?.default || mod;

        if (options?.__chunkId && typeof window !== "undefined") {
          window.__DYNAMIC_COMPONENTS__ = window.__DYNAMIC_COMPONENTS__ || {};
          window.__DYNAMIC_COMPONENTS__[options.__chunkId] = Component;
        }
      });
    }
    return promise;
  };

  if (options?.__chunkId && typeof window !== "undefined") {
    window.__ASYNC_PRELOAD__ = window.__ASYNC_PRELOAD__ || {};
    window.__ASYNC_PRELOAD__[options.__chunkId] =
      window.__ASYNC_PRELOAD__[options.__chunkId] || doLoad;
  }

  const dynamicComponent: DynamicComponent<InferedModuleProps<TModule>> = (
    props
  ) => {
    const asyncContext = useContext(context);
    if (asyncContext && options?.__chunkId) {
      asyncContext.chunks.add(options.__chunkId);
    }

    if (Component) {
      return createElement(Component, props);
    }

    doLoad();

    throw promise;
  };

  return dynamicComponent;
};
