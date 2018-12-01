import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { USER_FRAGMENTS } from './userFragments';

export const EDIT_USER_MUTATION = gql`
  mutation EditUser(
    $displayName: String
    $introduction: String
    $occupationTypeId: String
    $genreId: ID
    $skillIds: [ID]
    $occupation: String
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
        occupation: $occupation
        companyName: $companyName
        schoolName: $schoolName
      }
    ) {
        ${parseFragment(USER_FRAGMENTS.userDetails)}
      }
  }
`;
