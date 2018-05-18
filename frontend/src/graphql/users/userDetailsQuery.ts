import gql from "graphql-tag";
import { USER_FRAGMENTS } from './userFragments';

export const USER_DETAILS_QUERY = gql`
query User($id: ID!) {
  user(id: $id) {
    ${USER_FRAGMENTS.userDetails}
  }
}`;
