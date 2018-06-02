import gql from "graphql-tag";
import { USER_FRAGMENTS } from "./userFragments";

export const MY_USER_QUERY = gql`
query MyUser {
  myUser {
    ${USER_FRAGMENTS.userDetails}
  }
}`;
