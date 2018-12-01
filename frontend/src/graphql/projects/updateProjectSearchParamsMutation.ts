import graphqlTag from 'graphql-tag';

export const UPDATE_PROJECT_SEARCH_PARMS_MUTATION = gql`
  mutation UpdateProjectSearchParams($genreId: ID, $city: City, $skills: [Skill]) {
    updateProjectSearchParams(projectSearchParams: {genreId: $genreId, city: $city, skills: $skills}) @client
  }
`;
