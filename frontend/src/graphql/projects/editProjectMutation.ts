import gql from "graphql-tag";
import { PROJECT_FRAGMENTS } from "./projectFragments";

export const EDIT_PROJECT_MUTATION = gql`
mutation EditProject($id: Int!, $name: String!, $leadSentence: String, $motivation: String, $requirement: String, $genreId: Int, $skillIds: [Int]) {
  editProject(id: $id, projectInput: {name: $name, leadSentence: $leadSentence, motivation: $motivation, requirement: $requirement, genreId: $genreId, skillIds: $skillIds}) {
    ${PROJECT_FRAGMENTS.projectCore}
  }
}`;
