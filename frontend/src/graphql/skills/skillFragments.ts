import gql from "graphql-tag";

export const SKILL_FRAGMENTS = {
  feedSkill: gql`
  fragment FeedSkill on Skill {
    id
    name
  }`
};
