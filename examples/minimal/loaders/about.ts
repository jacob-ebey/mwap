import type { Loader, LoaderConfigFunc } from "@mwap/loaders";

export type AboutPageData = {
  message: string;
  ttl: number;
};

const loader: Loader<AboutPageData> = ({ search }) => {
  const url = new URL(`https://mock.com/${search}`);
  const message = url.searchParams.get("message");

  return {
    message: message || "Chickens are funny animals",
    ttl: 20,
  };
};

const config: LoaderConfigFunc<AboutPageData> = ({ data }) => ({
  headers: {
    "cache-control": `public, max-age=${data.ttl}`,
  },
});

export default { loader, config };
