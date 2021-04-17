import * as React from "react";
import { createContext } from "react";
import type { FC } from "react";

export type GetLoaderData = <T>(id: string, search: string) => Promise<T> | T;

type LoadersContext = {
  getData: GetLoaderData;
  search: string;
};

export const context = createContext<LoadersContext | null>(null);

export const LoaderProvider: FC<LoadersContext> = ({
  children,
  getData,
  search,
}) => {
  const value = {
    getData,
    search,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};
