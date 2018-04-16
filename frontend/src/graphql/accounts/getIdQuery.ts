import gql from "graphql-tag";

export const GET_ID_QUERY = gql`
{
  test {
    uid
  }
}`;
