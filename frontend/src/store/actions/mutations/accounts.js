import gql from 'graphql-tag';
export const signUp = gql`
  mutation ($providerId: String!, $uid: String!) {
    signUp(providerId: $providerId, uid: $uid) {
      uid
      token
    }
  }
`;
