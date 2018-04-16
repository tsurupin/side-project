import gql from "graphql-tag";

export const ACCEPT_USER_LIKE_MUTATION = gql`
mutation AcceptUserLike($likeId: Int!) {
  acceptUserLike(likeId: $likeId) {
    id
  }
}`;
