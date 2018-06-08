import gql from "graphql-tag";

export const DELTE_PROJECT_PHOTO_MUTATION = gql`
  mutation DeleteProjectPhoto($photoId: ID!) {
    deleteProjectPhoto(photoId: $photoId)
  }
`;
