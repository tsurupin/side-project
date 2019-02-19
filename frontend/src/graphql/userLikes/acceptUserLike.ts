import gql from 'graphql-tag';

export const ACCEPT_USER_LIKE_MUTATION = gql`
  mutation AcceptUserLike($userId: ID!) {
    acceptUserLike(userId: $userId)
  }
`;
