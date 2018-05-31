import gql from "graphql-tag";
import { MESSAGE_DETAIL_FRAGMENT } from "./chatFragments";

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($chatId: ID!, $comment: String, $image: Upload) {
    createMessage(
      messageInput: { chatId: $chatId, comment: $comment, image: $image }
    ) {
      ${MESSAGE_DETAIL_FRAGMENT}
    }
  }
`;
