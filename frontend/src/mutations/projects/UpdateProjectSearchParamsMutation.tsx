import * as React from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_PROJECT_SEARCH_PARMS_MUTATION } from '../../graphql/projects';

type Props = {
  children: any;
};


const UpdateProjectSearchParamsMutation = (props: Props) => {
  const { children } = props;
  return (
    <Mutation mutation={UPDATE_PROJECT_SEARCH_PARMS_MUTATION}>
      {(updateProjectSearchParamsMutation, { error }) => {
        return children({ updateProjectSearchParamsMutation, error });
      }}
    </Mutation>
  );
};

export default UpdateProjectSearchParamsMutation;
