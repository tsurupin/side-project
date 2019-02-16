import gql from 'graphql-tag';

export const CHANGE_PROJECT_STATUS_MUTATION = gql`
  mutation ChangeProjectStatus($id: ID!, $status: String!) {
    changeProjectStatus(id: $id, status: $status)
  }
`;
