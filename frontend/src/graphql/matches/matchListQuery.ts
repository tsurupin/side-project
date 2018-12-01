import graphqlTag from 'graphql-tag';

export const MATCH_LIST_QUERY = gql`
  query MatchList {
    matchList {
      likedUserList {
        id
        displayName
        mainPhotoUrl
      }
      chatList {
        id
        name
        lastComment
        lastCommentedAt
        imageUrl
      }
    }
  }
`;
