import { getLoaderCacheId } from "@mwap/loaders";
import type { GetLoaderData } from "@mwap/loaders";

type LoaderCacheValue<TData> = {
  error?: Error;
  preRenderData?: TData;
  promise?: Promise<TData>;
};

const ssrDataElement = document.querySelector(`script[type="__SSR_DATA__"]`);
const ssrCache = ssrDataElement
  ? JSON.parse(decodeURI(ssrDataElement.innerHTML))
  : [];

const loadersCache = new Map<string, LoaderCacheValue<unknown>>(
  ssrCache.map(({ id, ...rest }) => [id, rest])
);
(window as any).loadersCache = loadersCache;

const loadData = <TData>(
  cacheId: string,
  id: string,
  search: string
): Promise<TData> => {
  // TODO: Make loaders api path configurable
  const loaderPromsie = fetch(
    `/.mwap/loaders?loader=${encodeURI(id)}&search=${encodeURI(search)}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load data for loader: ${cacheId}`);
      }
      return res;
    })
    .then((res) => res.json())
    .then((preRenderData) => {
      loadersCache.set(cacheId, { preRenderData });
      return preRenderData;
    })
    .catch((error) => {
      loadersCache.set(cacheId, { error });
      throw error;
    });

  loadersCache.set(cacheId, { promise: loaderPromsie });

  return loaderPromsie;
};

export const getData: GetLoaderData = <TData>(id: string, search: string) => {
  const cacheId = getLoaderCacheId(id, search);

  const cached = loadersCache.get(cacheId) as LoaderCacheValue<TData>;
  if (cached) {
    if (cached.preRenderData || cached.promise) {
      return cached.preRenderData || cached.promise;
    }

    if (cached.error) {
      throw cached.error;
    }
  }

  return loadData(cacheId, id, search);
};
