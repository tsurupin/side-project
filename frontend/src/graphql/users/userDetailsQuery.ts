import gql from 'graphql-tag';
import { USER_FRAGMENTS } from './userFragments';
import { parseFragment } from '../utilities/parseFragment';

export const USER_DETAILS_QUERY = gql`
query User($id: ID!) {
  user(id: $id) {
    ${parseFragment(USER_FRAGMENTS.userDetails)}
  }
}`;
