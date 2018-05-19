import gql from "graphql-tag";

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($chatId: Int!, $comment: String, $image: Upload) {
    createMessage(
      messageInput: { chatId: $chatId, comment: $comment, image: $image }
    ) {
      chatId
      comment
      imageUrl
      user {
        id
      }
    }
  }
`;
