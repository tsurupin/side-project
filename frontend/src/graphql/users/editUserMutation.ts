import gql from "graphql-tag";
import { USER_FRAGMENTS } from "./userFragments";
import { parseFragment } from "../utilities/parseFragment";

export const EDIT_USER_MUTATION = gql`
  mutation EditUser(
    $displayName: String
    $introduction: String
    $occupation: String
    $occupationTypeId: Int
    $genreId: Int
    $skillIds: [Int]
    $companyName: String
    $schoolName: String
    $latitude: Float
    $longitude: Float
  ) {
    editUser(
      userInput: {
        displayName: $displayName
        introduction: $introduction
        occupation: $occupation
        occupationTypeId: $occupationTypeId
        genreId: $genreId
        skillIds: $skillIds
        companyName: $companyName
        schoolName: $schoolName
        latitude: $latitude
        longitude: $longitude
      }
    ) {
        ${parseFragment(USER_FRAGMENTS.userDetails)}
      }
  }
`;
