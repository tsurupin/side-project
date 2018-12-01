import graphqlTag from 'graphql-tag';

export const LOGOUT_MUTATION = gql`
  mutation Logout($logined: Boolean!) {
    changeLoginStatus(logined: $logined) @client
  }
`;
