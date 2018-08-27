import gql from "graphql-tag";
import { parseFragment } from "../utilities/parseFragment";

const MESSAGE_DETAIL_FRAGMENT = parseFragment(gql`
fragment MessageDetail on Message {
  __typename
  id
  comment
  imageUrl
  insertedAt
  user {
    id
    displayName
    mainPhotoUrl
  }
}
`)

const CHAT_DETAIL_FRAGMENT = parseFragment(gql`
    fragment ChatDetail on Chat {
      __typename
      id
      name
      messages {
        ${MESSAGE_DETAIL_FRAGMENT}
      }
    }
  `
);

export {
  MESSAGE_DETAIL_FRAGMENT,
  CHAT_DETAIL_FRAGMENT
}

