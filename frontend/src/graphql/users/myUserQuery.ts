import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { USER_FRAGMENTS } from './userFragments';

export const MY_USER_QUERY = gql`
query MyUser{
  myUser {
    ${parseFragment(USER_FRAGMENTS.userDetails)}
  }
}`;
