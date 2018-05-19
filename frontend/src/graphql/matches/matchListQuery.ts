import gql from "graphql-tag";

export const MATCH_LIST_QUERY = gql`
  query MatchList {
    matchList {
      likedUserList {
        displayName
        mainPhotoUrl
      }
      chatList {
        id
        name
      }
    }
  }
`;
