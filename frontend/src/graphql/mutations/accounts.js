import gql from 'graphql-tag';

export const signUpMutation = gql`
  mutation ($providerId: String!, $uid: String!) {
    signup(providerId: $providerId, uid: $uid) {
      uid
      token
    }
  }
`;

export const loginMutation = gql`
  mutation login($logined: Boolean!) {
    changeLoginStatus(logined: $logined) @client
  }
`;

export const logoutMutation = gql`
  mutation logout($logined: Boolean!) {
    changeLoginStatus(logined: $logined) @client
  }
`;
