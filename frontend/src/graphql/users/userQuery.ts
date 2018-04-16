import gql from "graphql-tag";
import { USER_FRAGMENTS } from './userFragments';

export const USER_QUERY = gql`
query User($id: ID!) {
  user(id: $id) {
    ...UserDetail
  }
  ${USER_FRAGMENTS.userDetails}
}`;
