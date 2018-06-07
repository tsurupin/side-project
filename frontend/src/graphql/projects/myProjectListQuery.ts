import gql from "graphql-tag";
import { PROJECT_FRAGMENTS } from "./projectFragments";

export const MY_PROJECT_LIST_QUERY = gql`
query MyProjects {
  myProjects() {
    ${PROJECT_FRAGMENTS.projectOnList}
  }
}`;
