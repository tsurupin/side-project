import gql from "graphql-tag";

export const CHANGE_PROJECT_STATUS_MUTATION = gql`
  mutation ChangeProjectStatus($projectId: ID!, $status: String!) {
    changeProjectStatus(projectId: $projectId, status: $status)
  }
`;
