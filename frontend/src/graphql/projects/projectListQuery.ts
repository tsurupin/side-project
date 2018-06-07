import gql from "graphql-tag";
import { PROJECT_FRAGMENTS } from "./projectFragments";

export const PROJECT_LIST_QUERY = gql`
query Projects($genreId: Int, $skillIds: [Int]) {
  projects(conditions: {genreId: $genreId, skillIds: $skillIds}) {
    ${PROJECT_FRAGMENTS.projectOnList}
  }
}`;
