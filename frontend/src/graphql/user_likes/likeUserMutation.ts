import gql from "graphql-tag";

export const LIKE_USER_MUTATION = gql`
mutation LikeUser($targetUserId: Int!) {
  likeUser(targetUserId: $targetUserId)
}`;
