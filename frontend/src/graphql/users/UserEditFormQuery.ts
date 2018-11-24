import gql from "graphql-tag";
import { USER_FRAGMENTS } from "./userFragments";
import { parseFragment } from "../utilities/parseFragment";

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
