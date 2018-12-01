import graphqlTag from 'graphql-tag';
import { CHAT_DETAIL_FRAGMENT } from './chatFragments';

export const CHAT_QUERY = gql`
query Chat($id: ID!) {
  chat(id: $id) {
    ${CHAT_DETAIL_FRAGMENT}
  }
}`;
