import type { FC } from "react";
import * as React from "react";
import { Helmet } from "react-helmet-async";

import { useLoader } from "mwap";

import type { CountriesPageData } from "../loaders/countries";

const CountriesPage: FC = () => {
  const { countries } = useLoader<CountriesPageData>("countries");

  return (
    <>
      <Helmet>
        <title>Countries</title>
      </Helmet>

      <h1>Countries</h1>
      <ul>
        {countries.map(({ name, phone, currency }) => (
          <li key={name}>
            <p>{name}</p>
            <p>Phone: {phone}</p>
            <p>Currency: {currency}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CountriesPage;
