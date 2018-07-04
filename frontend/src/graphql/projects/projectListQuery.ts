import gql from "graphql-tag";
import { PROJECT_FRAGMENTS } from "./projectFragments";
import { parseFragment } from "../utilities/parseFragment";

export const PROJECT_LIST_QUERY = gql`
query Projects($genreId: ID, $cityId: ID, $skillIds: [ID]) {
  projects(conditions: {genreId: $genreId, $cityId: ID, skillIds: $skillIds}) {
    ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
  }
}`;
