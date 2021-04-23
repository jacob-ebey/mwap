import { useContext } from "react";

import { context } from "./context";

export const useLoader = <TData = any, TParams = any>(
  id: string,
  params?: TParams
) => {
  const { getData } = useContext(context);

  const data = getData<TData, TParams>(id, params || ({} as TParams));

  if ("then" in data) {
    throw data;
  }

  return data;
};
