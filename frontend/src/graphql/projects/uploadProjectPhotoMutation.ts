import gql from "graphql-tag";

export const UPLOAD_PROJECT_PHOTO_MUTATION = gql`
  mutation UploadProjectPhoto($projectId: ID!, $photo: Upload!, $rank: Int!) {
    uploadProjectPhoto(
      projectUploadInput: { projectId: $projectId, photo: $photo, rank: $rank }
    ) {
      id
      rank
      projectId
      imageUrl
    }
  }
`;
