import gql from 'graphql-tag';
import { SKILL_FRAGMENTS } from './skillFragments';
import { parseFragment } from '../utilities/parseFragment';

export const SKILLS_QUERY = gql`
query Skills($name: String!) {
  skills(name: $name) {
    ${parseFragment(SKILL_FRAGMENTS)}
  }
}`;
