import gql from "graphql-tag";

export const CountriesQuery = gql`
  query CountriesQuery {
    countries {
      name
      phone
      currency
    }
  }
`;
