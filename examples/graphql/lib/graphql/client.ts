import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  "https://countries.trevorblades.com/graphql"
);
