import gql from "graphql-tag";
import { USER_FRAGMENTS } from "./userFragments";
import { parseFragment } from "../utilities/parseFragment";

export const EDIT_USER_MUTATION = gql`
  mutation EditUser(
    $displayName: String
    $introduction: String
    $occupationTypeId: String
    $genreId: ID
    $skillIds: [ID]
    $companyName: String
    $schoolName: String
  ) {
    editUser(
      userInput: {
        displayName: $displayName
        introduction: $introduction
        occupationTypeId: $occupationTypeId
        genreId: $genreId
        skillIds: $skillIds
        companyName: $companyName
        schoolName: $schoolName
      }
    ) {
        ${parseFragment(USER_FRAGMENTS.userDetails)}
      }
  }
`;
