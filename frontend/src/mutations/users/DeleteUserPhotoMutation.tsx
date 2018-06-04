import * as React from "react";
import { Mutation } from "react-apollo";
import { DELETE_USER_PHOTO_MUTATION, USER_FRAGMENTS } from "../../graphql/users";
import { UserDetails } from "../../interfaces";

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
        
        const user: any = cache.readFragment({ 
          id: `User:${deletUserPhoto.userId}`,
          fragment: USER_FRAGMENTS.userDetails 
        });
        const photos = user.photos.filter(photo => photo.id != deletUserPhoto.id)
        
        cache.writeFragment({ 
          id: `User:${user.id}`,
          fragment: USER_FRAGMENTS.userDetails,
          data: {...user, photos} 
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
