import gql from "graphql-tag";
import { parseFragment } from '../utilities/parseFragment';

export const SKILL_FRAGMENTS = parseFragment(gql`
  fragment FeedSkill on Skill {
    id
    name
  }`
);

