import gql from "graphql-tag";

export const UPDATE_PROJECT_SEARCH_PARMS_MUTATION = gql`
  mutation UpdateProjectSearchParams($genreId: ID, $cityId: ID, $skills: [Skill]) {
    updateProjectSearchParams(projectSearchParams: {genreId: $genreId, cityId: $cityId, skills: $skills}) @client
  }
`;