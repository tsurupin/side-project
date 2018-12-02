import gql from 'graphql-tag';

export const WITHDRAW_PROJECT_LIKE_MUTATION = gql`
  mutation WithdrawProjectLike($projectId: ID!) {
    withdrawProjectLike(projectId: $projectId)
  }
`;
