import type { Loader, LoaderConfigFunc } from "mwap";

export type AboutPageData = {
  message: string;
  ttl: number;
};

export type AboutPageParams = {
  message?: string;
};

const loader: Loader<AboutPageData, AboutPageParams> = ({ params }) => {
  const message = params.message || "Chickens are funny animals";

  return {
    message,
    ttl: 20,
  };
};

const config: LoaderConfigFunc<AboutPageData> = ({ data }) => ({
  headers: {
    "cache-control": `public, max-age=${data.ttl}`,
  },
});

export default { loader, config };
