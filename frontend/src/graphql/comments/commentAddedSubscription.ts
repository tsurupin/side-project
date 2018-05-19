import gql from "graphql-tag";

export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription CommendAdded($repoName: String!) {
    commentAdded(repoName: $repoName) {
      id
      content
    }
  }
`;
