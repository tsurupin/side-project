import gql from "graphql-tag";

export const USER_FILTER_CONDITION_CLIENT_QUERY = gql`
{
  userFilterCondition @client {
    genreId
    occupationTypeId
    distance
    skillIds
    isActive
  }
}`;