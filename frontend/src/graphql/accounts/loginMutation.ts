import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation login($logined: Boolean!) {
    changeLoginStatus(logined: $logined) @client
  }
`;
