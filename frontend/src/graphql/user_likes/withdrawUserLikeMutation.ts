import gql from "graphql-tag";

export const WITHDRAW_USER_LIKE_MUTATION = gql`
mutation WithdrawUserLike($targetUserId: Int!) {
  withdrawUserLike(targetUserId: $targetUserId)
}`;
