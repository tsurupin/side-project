import * as React from "react";
import { Mutation } from "react-apollo";
import { DELETE_USER_PHOTO_MUTATION, USER_FRAGMENTS } from "../../graphql/users";

type Props = {
  children: any;
};

const DeleteUserPhotoMutation = (props: Props) => {
  const { children } = props;

  return (

    <Mutation
      mutation={DELETE_USER_PHOTO_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { deletUserPhoto } }) => {
        const { user } = cache.readFragment({ 
          id: deletUserPhoto.userId,
          fragment: USER_FRAGMENTS.userDetails 
        });

        const photos = user.photos.filter(photo => photo.id != deletUserPhoto.id)
        cache.writeFragment({ 
          id: user.id,
          fragment: USER_FRAGMENTS.userDetails,
          data: {user: {...user, photos}} 
        });
      }}

    >
      {(deleteUserPhotoMutation, { loading, error, data }) => {
        return children({
          deleteUserPhotoMutation,
          loading,
          error,
          data
        });
      }}
    </Mutation>
  );
};

export default DeleteUserPhotoMutation;
