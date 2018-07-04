import * as React from "react";
import { Mutation } from "react-apollo";
import { UPDATE_USER_SEARCH_PARMS_MUTATION } from "../../graphql/users";

const UpdateUserSearchParamsMutation = (props: any) => {
  const { children } = props;
  return (
    <Mutation mutation={UPDATE_USER_SEARCH_PARMS_MUTATION}>
      {(updateUserSearchParamsMutation, { error }) => {
        return children({ updateUserSearchParamsMutation, error });
      }}
    </Mutation>
  );
};

export default UpdateUserSearchParamsMutation;
