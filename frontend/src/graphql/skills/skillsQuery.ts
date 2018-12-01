import graphqlTag from 'graphql-tag';
import { parseFragment } from '../utilities/parseFragment';
import { SKILL_FRAGMENTS } from './skillFragments';

export const SKILLS_QUERY = gql`
query Skills($name: String!) {
  skills(name: $name) {
    ${parseFragment(SKILL_FRAGMENTS)}
  }
}`;
