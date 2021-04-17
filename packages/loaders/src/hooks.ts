import { useContext } from "react";

import { context } from "./context";

export const useLoader = <T>(id: string) => {
  const { search, getData } = useContext(context);

  const data = getData<T>(id, search);

  if ("then" in data) {
    throw data;
  }

  return data;
};
