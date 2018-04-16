import gql from "graphql-tag";

export const LOGIN_STATUS_QUERY = gql`
query LoginStatus {
  logingStatus {
    logined @client
  }
}`;
