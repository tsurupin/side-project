import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation Login($logined: Boolean!) {
    changeLoginStatus(logined: $logined) @client
  }
`;
