import gql from 'graphql-tag';
import { MESSAGE_DETAIL_FRAGMENT } from './chatFragments';
export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage($chatId: ID!) {
    newMessage(chatId: $chatId) {
      ${MESSAGE_DETAIL_FRAGMENT}
    }
  }
`;
