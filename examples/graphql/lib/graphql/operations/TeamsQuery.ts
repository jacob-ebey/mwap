import { gql } from 'graphql-request'

export const TeamsQuery = gql`
  query TeamsQuery {
    teams {
      name
      city
    }
  }
`
