import gql from "graphql-tag";

export const UPLOAD_USER_PHOTO_MUTATION = gql`
  mutation UploadUserPhoto($photo: Upload!, $isMain: Boolean!, $rank: Int!) {
    uploadUserPhoto(
      userUploadInput: { photo: $photo, isMain: $isMain, rank: $rank }
    ) {
      id
      userId
      imageUrl
    }
  }
`;
