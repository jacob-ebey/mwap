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

export type LoadersContext = {
  getData: GetLoaderData;
  loaderCache: Map<string, LoaderCacheValue<unknown>>;
};

export const createLoaderContext = (): LoadersContext => {
  const loaderCache = new Map<string, LoaderCacheValue<unknown>>();

  const loadData = async <TData, TParams>(
    cacheId: string,
    id: string,
    params: TParams
  ): Promise<TData> => {
    // @ts-ignore
    const loadersModule = require("mwap-loaders");
    const loaders: Loaders =
      (loadersModule && loadersModule.default) || loadersModule || {};

    const loaderModule = loaders[id];

    if (!loaderModule) {
      throw new Error(`Loader ${JSON.stringify(id)} does not exist.`);
    }

    const loader: Loader<TData, TParams> = loaderModule.loader;

    const loaderPromise = Promise.resolve(loader({ params }))
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

  const getData: GetLoaderData = <TData, TParams>(
    id: string,
    params: TParams
  ) => {
    const cacheId = getLoaderCacheId(id, params || {});

    const cached = loaderCache.get(cacheId) as LoaderCacheValue<TData>;
    if (cached) {
      if (cached.preRenderData || cached.promise) {
        return cached.preRenderData || cached.promise;
      }

      if (cached.error) {
        throw cached.error;
      }
    }

    return loadData<TData, TParams>(cacheId, id, params || ({} as TParams));
  };

  return { getData, loaderCache };
};
