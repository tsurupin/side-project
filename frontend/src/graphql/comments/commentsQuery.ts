import gql from "graphql-tag";

export const COMMENTS_QUERY = gql`
query Comments($repoName: String!) {
  comments(repoName: $repoName) {
    id
    content
  }
}`;
