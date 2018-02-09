import { gql } from 'apollo-client';
export const signUp = gql`
  mutation ($providerId: String!, $uid: String!) {
    signUp(providerId: $providerId, uid: $uid) {
      uid
      token
    }
  }
`;
