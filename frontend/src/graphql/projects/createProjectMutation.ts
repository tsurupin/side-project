import gql from "graphql-tag";
import { PROJECT_FRAGMENTS } from "./projectFragments";

export const CREATE_PROJECT_MUTATION = gql`
mutation CreateProject($name: String!, $leadSentence: String, $motivation: String, $requirement: String, $genreId: Int, $skillIds: [Int]) {
  createProject(projectInput: {name: $name, leadSentence: $leadSentence, motivation: $motivation, requirement: $requirement, genreId: $genreId, skillIds: $skillIds}) {
    ...ProjectCore
  }
  ${PROJECT_FRAGMENTS.projectCore}
}`;
