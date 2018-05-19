import gql from "graphql-tag";

export const SIGN_UP_MUTATION = gql`
  mutation($providerId: String!, $uid: String!) {
    signUp(providerId: $providerId, uid: $uid) {
      uid
      token
    }
  }
`;
