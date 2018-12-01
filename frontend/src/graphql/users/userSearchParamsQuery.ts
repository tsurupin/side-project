import graphqlTag from 'graphql-tag';

export const USER_SEARCH_PARAMS_QUERY = gql`
{
  userSearchParams @client {
    genreId
    occupationTypeId
    isActive
    skills {
      id
      name
    }
    location {
      latitude
      longitude
      distance
    }
  }
}`;
