import gql from "graphql-tag";
import { parseFragment } from '../utilities/parseFragment';

export const CHAT_FRAGMENTS = {
  messageDetail: parseFragment(gql`
  fragment MessageDetail on Message {
    id
    comment
    imageUrl
    user {
      id
      displayName
      mainPhotoUrl
    }
  }
  `),
  chatDetail: parseFragment(gql`
  fragment ChatDetail on Chat {
    id
    name
    messages {
      ...MessageDetail
    }
  }
  `),
};




