export const getLoaderCacheId = (id: string, search: string) => {
  return `{ "id": ${JSON.stringify(id)}, "search": ${JSON.stringify(search)} }`;
};
