import { getLoaderCacheId } from "@mwap/loaders";
import type {
  GetLoaderData,
  Loader,
  LoaderConfig,
  LoaderConfigFunc,
} from "@mwap/loaders";

export type LoaderCacheValue<TData> = {
  error?: Error;
  preRenderData?: TData;
  promise?: Promise<TData>;
};

type Loaders = {
  [id: string]: {
    loader: Loader;
    config: LoaderConfig | LoaderConfigFunc;
  };
};

// @ts-ignore
const loadersModule = require("mwap-loaders");
const loaders: Loaders =
  (loadersModule && loadersModule.default) || loadersModule || {};

export const createLoaderContext = () => {
  const loaderCache = new Map<string, LoaderCacheValue<unknown>>();

  const loadData = async <TData>(
    cacheId: string,
    id: string,
    search: string
  ): Promise<TData> => {
    const loaderModule = loaders[id];

    if (!loaderModule) {
      throw new Error(`Loader ${JSON.stringify(id)} does not exist.`);
    }

    const loaderPromise = Promise.resolve(loaderModule.loader({ search }))
      .then((preRenderData) => {
        loaderCache.set(cacheId, { preRenderData });
        return preRenderData;
      })
      .catch((error) => {
        loaderCache.set(cacheId, { error });
        throw error;
      });

    loaderCache.set(cacheId, { promise: loaderPromise });

    return loaderPromise;
  };

  const getData: GetLoaderData = <TData>(id: string, search: string) => {
    const cacheId = getLoaderCacheId(id, search);

    const cached = loaderCache.get(cacheId) as LoaderCacheValue<TData>;
    if (cached) {
      if (cached.preRenderData || cached.promise) {
        return cached.preRenderData || cached.promise;
      }

      if (cached.error) {
        throw cached.error;
      }
    }

    return loadData<TData>(cacheId, id, search);
  };

  return { getData, loaderCache };
};
