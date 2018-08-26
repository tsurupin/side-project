import gql from "graphql-tag";
import { MESSAGE_DETAIL_FRAGMENT } from "./chatFragments";

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($chatId: ID!, $comment: String, $image: Upload, $messageType: String!) {
    createMessage(
      messageInput: { chatId: $chatId, comment: $comment, image: $image, messageType: $messageType}
    ) {
      ${MESSAGE_DETAIL_FRAGMENT}
    }
  }
`;
