import gql from "graphql-tag";
import { SKILL_FRAGMENTS } from './skillFragments';

export const SKILLS_QUERY = gql`
query Skills($term: String!) {
  skills(term: $term) {
    ${SKILL_FRAGMENTS}
  }
}`;
