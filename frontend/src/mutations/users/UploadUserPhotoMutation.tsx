import * as React from 'react';
import { Mutation } from 'react-apollo';
import {
  UPLOAD_USER_PHOTO_MUTATION,
  USER_FRAGMENTS,
} from '../../graphql/users';
import { UserDetails } from '../../interfaces';

type Props = {
  children: any;
};

const UploadUserPhotoMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={UPLOAD_USER_PHOTO_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { uploadUserPhoto } }) => {
        const fragmentId = `User:${uploadUserPhoto.userId}`;
        const user: UserDetails = cache.readFragment({
          id: fragmentId,
          fragment: USER_FRAGMENTS.userDetails,
        });
        const { id, rank, imageUrl } = uploadUserPhoto;
        const newPhoto = { __typename: 'UserPhoto', id, rank, imageUrl };

        const photos = [...user.photos, newPhoto];

        cache.writeFragment({
          id: fragmentId,
          fragment: USER_FRAGMENTS.userDetails,
          data: { ...user, photos },
        });
      }}
    >
      {(uploadUserPhotoMutation, { loading, error, data }) => {
        return children({
          uploadUserPhotoMutation,
          loading,
          error,
          data,
        });
      }}
    </Mutation>
  );
};

export default UploadUserPhotoMutation;
