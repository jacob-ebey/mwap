import * as React from "react";
import { createContext } from "react";
import type { FC } from "react";

type AsyncContext = {
  chunks: Set<string | number>;
};

export const context = createContext<AsyncContext | null>(null);

export const AsyncProvider: FC<AsyncContext> = ({ children, chunks }) => {
  const value = {
    chunks,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};
