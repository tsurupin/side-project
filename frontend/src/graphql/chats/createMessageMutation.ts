import gql from "graphql-tag";

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($chatId: ID!, $comment: String, $image: Upload) {
    createMessage(
      messageInput: { chatId: $chatId, comment: $comment, image: $image }
    ) {
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
