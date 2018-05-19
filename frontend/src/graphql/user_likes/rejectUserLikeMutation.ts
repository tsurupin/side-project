import gql from "graphql-tag";

export const REJECT_USER_LIKE_MUTATION = gql`
  mutation RejectUserLike($likeId: Int!) {
    rejectUserLike(likeId: $likeId)
  }
`;
