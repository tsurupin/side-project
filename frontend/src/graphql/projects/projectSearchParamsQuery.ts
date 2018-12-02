import gql from 'graphql-tag';

export const PROJECT_SEARCH_PARAMS_QUERY = gql`
{
  projectSearchParams @client {
    genreId
    skills {
      id
      name
    }
    city {
      id
      fullName
    }
  }
}`;
