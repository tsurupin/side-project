import gql from "graphql-tag";

export const SUBMIT_COMMENT_MUTATION = gql`
  mutation SubmitComment($repoName: String!) {
    submitComment(repoName: $repoName) {
      id
      content
    }
  }
`;
