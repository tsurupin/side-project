import gql from "graphql-tag";
import { USER_FRAGMENTS } from "./userFragments";
import { parseFragment } from "../utilities/parseFragment";

export const MY_USER_QUERY = gql`
query MyUser{
  myUser {
    ${parseFragment(USER_FRAGMENTS.userDetails)}
  }
}`;
