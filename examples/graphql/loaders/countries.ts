import type { Loader, LoaderConfigFunc } from "mwap";

import { client, CountriesQuery } from "../lib/graphql";

type CountryData = {
  name: string;
  phone: string;
  currency: string;
};

export type CountriesPageData = {
  countries: CountryData[];
  ttl: number;
};

const loader: Loader<CountriesPageData> = () => {
  const data = client.request(CountriesQuery);

  console.dir(data, { colors: true, depth: null });

  return {
    countries: [],
    ttl: 604800,
  };
};

const config: LoaderConfigFunc<CountriesPageData> = ({ data }) => ({
  headers: {
    "cache-control": `public, max-age=${data.ttl}`,
  },
});

export default { loader, config };
