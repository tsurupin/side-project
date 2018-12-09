import gql from 'graphql-tag';
import { CHAT_DETAIL_FRAGMENT } from './chatFragments';

export const CHAT_QUERY = gql`
query Chat($chatId: ID!) {
  chat(id: $chatId) {
    ${CHAT_DETAIL_FRAGMENT}
  }
}`;
