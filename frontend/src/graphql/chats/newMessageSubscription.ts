import gql from "graphql-tag";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage($chatId: ID!) {
    newMessage(chatId: $chatId) {
      id
      comment
      imageUrl
      user {
        id
        displayName
        mainPhotoUrl
      }
    }
  }
`;
