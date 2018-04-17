import gql from "graphql-tag";
import { PROJECT_FRAGMENTS } from "./projectFragments";

export const PROJECTS_QUERY = gql`
query Projects($genreId: Int, $skillIds: [Int]) {
  projects(conditions: {genreId: $genreId, skillIds: $skillIds}) {
    ${PROJECT_FRAGMENTS.projectOnList}
  }
}`;
