import gql from "graphql-tag";

function inlineFragment(parsedDoc) {
  return parsedDoc.loc.source.body.replace(/fragment [_A-Za-z][_0-9A-Za-z]*/, '...');
};

export const SKILL_FRAGMENTS = inlineFragment(gql`
  fragment FeedSkill on Skill {
    id
    name
  }`
);

