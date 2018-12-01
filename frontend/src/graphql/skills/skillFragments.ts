import graphqlTag from 'graphql-tag';

export const SKILL_FRAGMENTS = gql`
  fragment FeedSkill on Skill {
    id
    name
  }
`;
