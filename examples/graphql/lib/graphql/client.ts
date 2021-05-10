import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT as string)

const authorizedClient = new GraphQLClient(process.env.GRAPHQL_API_ENDPOINT as string, {
  headers: process.env.GRAPHQL_API_TOKEN
    ? {
        Authorization: `Bearer ${process.env.GRAPHQL_API_TOKEN}`,
      }
    : {},
})

export { client, authorizedClient }
