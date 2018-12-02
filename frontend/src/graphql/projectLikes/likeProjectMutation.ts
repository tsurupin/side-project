import gql from 'graphql-tag';

export const LIKE_PROJECT_MUTATION = gql`
  mutation LikeProject($projectId: ID!) {
    likeProject(projectId: $projectId) {
      id
    }
  }
`;
