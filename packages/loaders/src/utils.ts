import stringify from "json-stringify-deterministic";

export const getLoaderCacheId = (id: string, params: any) => {
  return `{ "id": ${JSON.stringify(id)}, "params": ${stringify(params)} }`;
};
