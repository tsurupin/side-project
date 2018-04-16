import gql from "graphql-tag";

export const CHAT_FRAGMENTS = {
  messageDetail: gql`
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
  `,
  chatDetail: gql`
  fragment ChatDetail on Chat {
    id
    name
    messages {
      ...MessageDetail
    }
  }
  `,
};




