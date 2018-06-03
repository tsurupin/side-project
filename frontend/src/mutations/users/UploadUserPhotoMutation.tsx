import * as React from "react";
import { Mutation } from "react-apollo";
import { UPLOAD_USER_PHOTO_MUTATION, USER_FRAGMENTS } from "../../graphql/users";

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
        const { user } = cache.readFragment({ 
          id: uploadUserPhoto.userId,
          fragment: USER_FRAGMENTS.userDetails 
        });

        const photos = [...user.photos, uploadUserPhoto.photo].sort(photo => photo.rank)

        cache.writeFragment({ 
          id: user.id,
          fragment: USER_FRAGMENTS.userDetails,
          data: {user: {...user, photos}} 
        });
      }}

    >
      {(uploadUserPhotoMutation, { loading, error, data }) => {
        return children({
          uploadUserPhotoMutation,
          loading,
          error,
          data
        });
      }}
    </Mutation>
  );
};

export default UploadUserPhotoMutation;
