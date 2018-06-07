import gql from "graphql-tag";
import { PROJECT_FRAGMENTS } from "./projectFragments";
import { parseFragment } from "../utilities/parseFragment";

export const PROJECT_LIST_QUERY = gql`
query Projects($genreId: Int, $skillIds: [Int]) {
  projects(conditions: {genreId: $genreId, skillIds: $skillIds}) {
    ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
  }
}`;
