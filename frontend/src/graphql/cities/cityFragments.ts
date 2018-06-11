import gql from "graphql-tag";

export const CITY_FRAGMENTS = gql`
  fragment FeedCity on City {
    id
    fullName
  }
`;
