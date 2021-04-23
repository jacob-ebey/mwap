import type { Loader, LoaderConfigFunc } from "@mwap/loaders";

export type HomePageData = {
  name: string;
  ttl: number;
};

const loader: Loader<HomePageData> = () => {
  return {
    name: "World",
    ttl: 604800,
  };
};

const config: LoaderConfigFunc<HomePageData> = ({ data }) => ({
  headers: {
    "cache-control": `public, max-age=${data.ttl}`,
  },
});

export default { loader, config };
