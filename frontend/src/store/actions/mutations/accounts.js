import gql from 'graphql-tag';
export const signUpMutation = gql`
  mutation ($providerId: String!, $uid: String!) {
    signUp(providerId: $providerId, uid: $uid) {
      uid
      token
    }
  }
`;
