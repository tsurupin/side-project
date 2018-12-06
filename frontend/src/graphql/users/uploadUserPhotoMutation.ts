import gql from 'graphql-tag';

export const UPLOAD_USER_PHOTO_MUTATION = gql`
  mutation UploadUserPhoto($photo: Upload!, $rank: Int!) {
    uploadUserPhoto(userUploadInput: { photo: $photo, rank: $rank }) {
      id
      rank
      userId
      imageUrl
    }
  }
`;
