import gql from "graphql-tag";
import { PROJECT_FRAGMENTS } from "./projectFragments";
import { parseFragment } from "../utilities/parseFragment";

export const EDITABLE_PROJECT_LIST_QUERY = gql`
query EditableProjects {
  editableProjects {
    ${parseFragment(PROJECT_FRAGMENTS.projectOnList)}
  }
}`;
