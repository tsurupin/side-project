import gql from "graphql-tag";

export const UPLOAD_PROJECT_PHOTO_MUTATION = gql`
  mutation UploadProjectPhoto($photo: Upload!, $rank: Int!) {
    uploadProjectPhoto(
      projectUploadInput: { photo: $photo, rank: $rank }
    ) {
      id
      rank
      projectId
      imageUrl
    }
  }
`;
