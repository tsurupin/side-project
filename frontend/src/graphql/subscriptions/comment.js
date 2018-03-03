import gql from 'graphql-tag';

export const commentAddedSubscription = gql`
  subscription commendAdded ($repo_name: String!) {
    commentAdded(repo_name: $repo_name) {
      comment
    }
  }
`;
