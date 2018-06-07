import * as React from "react";
import { Mutation } from "react-apollo";
import { EDIT_USER_MUTATION, USER_FRAGMENTS } from "../../graphql/users";

type Props = {
  children: any;
};

const EditUserMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={EDIT_USER_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { editUser } }) => {
        const fragmentId: string = `User:${editUser.id}`;
        const { user } = cache.readFragment({
          id: fragmentId,
          fragment: USER_FRAGMENTS.userDetails
        });

        cache.writeFragment({
          id: fragmentId,
          fragment: USER_FRAGMENTS.userDetails,
          data: { user: { ...user, editUser } }
        });
      }}
    >
      {(editUserMutation, { loading, error, data }) => {
        return children({
          editUserMutation,
          loading,
          error,
          data
        });
      }}
    </Mutation>
  );
};

export default EditUserMutation;
