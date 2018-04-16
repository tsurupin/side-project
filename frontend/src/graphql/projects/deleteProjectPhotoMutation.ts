import gql from "graphql-tag";

export const DELTE_PROJECT_PHOTO_MUTATION = gql`
mutation DeleteProjectPhoto($photoId: Int!) {
  deleteProjectPhoto(photoId: $photoId)
}`;
