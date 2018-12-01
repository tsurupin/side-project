import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { USER_FRAGMENTS } from './userFragments';

export const USER_DETAILS_QUERY = gql`
query User($id: ID!) {
  user(id: $id) {
    ${parseFragment(USER_FRAGMENTS.userDetails)}
  }
}`;
