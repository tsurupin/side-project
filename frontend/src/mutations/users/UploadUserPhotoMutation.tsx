import * as React from "react";
import { Mutation } from "react-apollo";
import { UPLOAD_USER_PHOTO_MUTATION, USER_FRAGMENTS } from "../../graphql/users";

type Props = {
  children: any;
};

const DeleteUserPhotoMutation = (props: Props) => {
  const { children } = props;

  return (

    <Mutation
      mutation={UPLOAD_USER_PHOTO_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { deletUserPhoto } }) => {
        const { user } = cache.readFragment({ 
          id: editUser.id,
          fragment: USER_FRAGMENTS.userDetails 
        });

        cache.writeFragment({ 
          id: user.id,
          fragment: USER_FRAGMENTS.userDetails,
          date: {user: {...user, editUser }} 
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
