import graphqlTag from 'graphql-tag';

export const SIGN_UP_MUTATION = gql`
  mutation SignUp($providerId: String!, $uid: String!) {
    signUp(providerId: $providerId, uid: $uid) {
      uid
      token
    }
  }
`;
