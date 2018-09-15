import * as React from "react";
import { Mutation } from "react-apollo";
import {
  DELETE_USER_PHOTO_MUTATION,
  USER_FRAGMENTS
} from "../../graphql/users";
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
      update={(cache, { data: { deleteUserPhoto } }) => {
        const fragmentId: string = `User:${deleteUserPhoto.userId}`;
        const user: any = cache.readFragment({
          id: fragmentId,
          fragment: USER_FRAGMENTS.userDetails
        });
        const photos = user.photos.filter(
          (photo) => photo.id != deleteUserPhoto.id
        );

        cache.writeFragment({
          id: fragmentId,
          fragment: USER_FRAGMENTS.userDetails,
          data: { ...user, photos }
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
