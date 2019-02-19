import gql from 'graphql-tag';

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
        lastComment
        lastCommentedAt
        subject {
          id
          name
          sourceType
          imageUrl
        }
      }
    }
  }
`;
