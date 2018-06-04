import gql from "graphql-tag";

export const DELETE_USER_PHOTO_MUTATION = gql`
  mutation DeleteUserPhoto($photoId: ID!) {
    deleteUserPhoto(photoId: $photoId)
  }
`;

