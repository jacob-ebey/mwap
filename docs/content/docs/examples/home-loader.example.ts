import type { Loader } from "@mwap/loaders";

export type HomePageData = {
  name: string;
};

const loader: Loader<HomePageData> = () => {
  return {
    name: "World",
  };
};

export default { loader };
