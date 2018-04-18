import gql from "graphql-tag";
import { CHAT_FRAGMENTS } from "./chatFragments";

export const CHAT_QUERY = gql`
query Chat($id: ID!) {
  chat(id: $id) {
    ${CHAT_FRAGMENTS.chatDetail}
  }
}`;
