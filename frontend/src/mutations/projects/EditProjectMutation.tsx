import * as React from 'react';
import { Mutation } from 'react-apollo';
import { EDIT_PROJECT_MUTATION } from '../../graphql/projects';

type Props = {
  children: any;
};

const EditProjectMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation mutation={EDIT_PROJECT_MUTATION} context={{ needAuth: true }}>
      {(editProjectMutation, { loading, error, data }) => {
        return children({
          editProjectMutation,
          loading,
          error,
          data
        });
      }}
    </Mutation>
  );
};

export default EditProjectMutation;
