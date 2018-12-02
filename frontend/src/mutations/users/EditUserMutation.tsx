import * as React from 'react';
import { Mutation } from 'react-apollo';
import { EDIT_USER_MUTATION, USER_FRAGMENTS } from '../../graphql/users';

type Props = {
  children: any;
};

const EditUserMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={EDIT_USER_MUTATION} context={{ needAuth: true }}>
      {(editUserMutation, { loading, error, data }) => {
        return children({
          editUserMutation,
          loading,
          error,
          data,
        });
      }}
    </Mutation>
  );
};

export default EditUserMutation;
