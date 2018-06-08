import gql from "graphql-tag";

export const DELETE_PROJECT_LIKE_MUTATION = gql`
  mutation DeleteProjectLike($projectId: ID!) {
    deleteProjectLike(projectId: $projectId) {
      id
    }
  }
`;
