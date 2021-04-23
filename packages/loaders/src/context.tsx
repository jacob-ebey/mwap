import * as React from "react";
import { createContext } from "react";
import type { FC } from "react";

export type GetLoaderData = <TData, TParams = any>(
  id: string,
  params?: TParams
) => Promise<TData> | TData;

type LoadersContext = {
  getData: GetLoaderData;
};

export const context = createContext<LoadersContext | null>(null);

export const LoaderProvider: FC<LoadersContext> = ({ children, getData }) => {
  const value = {
    getData,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};
