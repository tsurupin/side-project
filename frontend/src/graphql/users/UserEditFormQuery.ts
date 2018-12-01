import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { USER_FRAGMENTS } from './userFragments';

export const USER_EDIT_FORM_QUERY = gql`
query UserEditForm{
  userForm {
    genres {
      id
      name
    }
    occupationTypes {
      id
      name
    }
  }
  myUser {
    ${parseFragment(USER_FRAGMENTS.userDetails)}
  }
}`;
