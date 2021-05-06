import type { Loader } from "mwap";

export type HomePageData = {
  name: string;
};

const loader: Loader<HomePageData> = () => {
  return {
    name: "World",
  };
};

export default { loader };
