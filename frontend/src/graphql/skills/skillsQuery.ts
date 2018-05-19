import gql from "graphql-tag";
import { SKILL_FRAGMENTS } from "./skillFragments";

export const SKILLS_QUERY = gql`
query Skills($name: String!) {
  skills(name: $name) {
    ${SKILL_FRAGMENTS}
  }
}`;
