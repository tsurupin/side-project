import gql from 'graphql-tag';

export const REJECT_USER_LIKE_MUTATION = gql`
  mutation RejectUserLike($userId: ID!) {
    rejectUserLike(userId: $userId)
  }
`;
