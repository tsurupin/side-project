import gql from "graphql-tag";

export const LOGOUT_MUTATION = gql`
  mutation logout($logined: Boolean!) {
    changeLoginStatus(logined: $logined) @client
  }
`;
