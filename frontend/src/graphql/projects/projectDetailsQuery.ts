import gql from "graphql-tag";
import { PROJECT_FRAGMENTS } from "./projectFragments";

export const PROJECT_DETAILS_QUERY = gql`
query Project($id: ID!) {
  project(id: $id) {
    ${PROJECT_FRAGMENTS.projectDetails}
  }
}`;
