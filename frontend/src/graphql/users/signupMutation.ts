import gql from "graphql-tag";

export const SIGNUP_MUTATION = gql`
mutation Signup($providerId: String!, $uid: String!) {
  signup(providerId: $providerId, uid: $uid) {
    token
  }
}`;
