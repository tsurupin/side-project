import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
mutation ($providerId: String!, $uid: String!) {
  signup(providerId: $providerId, uid: $uid) {
    uid
    token
  }
}`;
