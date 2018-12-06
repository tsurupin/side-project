import gql from 'graphql-tag';

export const CREATE_SKILL_MUTATION = gql`
  mutation CreateSkill($name: String!) {
    createSkill(name: $name) {
      id
      name
    }
  }
`;
