import { gql } from 'graphql-request'

export const TeamsByIdQuery = gql`
  query TeamsByIdQuery($id: String!) {
    team(id: $id) {
      name
      city
    }
  }
`
