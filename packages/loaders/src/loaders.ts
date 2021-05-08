export { LoaderProvider } from "./context";
export type { GetLoaderData } from "./context";

export type LoaderConfig = {
  headers?: Record<string, string>;
};

export type LoaderConfigContext<TData> = {
  data: TData;
};

export type LoaderConfigFunc<
  TData = any,
  TConfig extends LoaderConfig = LoaderConfig
> = (context: LoaderConfigContext<TData>) => TConfig;

export type LoaderContext<TParams> = {
  params: TParams;
};

export type Loader<TData = any, TParams = any> = (
  context: LoaderContext<TParams>
) => TData | Promise<TData>;

export { useLoader } from "./hooks";

export { getLoaderCacheId } from "./utils";
