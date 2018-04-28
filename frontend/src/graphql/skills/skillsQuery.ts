import gql from "graphql-tag";
import { SKILL_FRAGMENTS } from './skillFragments';

export const SKILLS_QUERY = gql`
query($term: String!) {
  skills(term: $term) {
    id
    name
  }
}`;
