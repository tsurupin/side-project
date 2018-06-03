import gql from "graphql-tag";

export const DELETE_USER_PHOTO_MUTATION = gql`
  mutation DeleteUserPhoto($photoId: Int!) {
    deleteUserPhoto(photoId: $photoId) {
      id
      userId
    }
  }
`;

