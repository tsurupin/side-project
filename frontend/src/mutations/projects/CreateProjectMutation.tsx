import * as React from "react";
import { Mutation } from "react-apollo";
import { CREATE_PROJECT_MUTATION, PROJECT_FRAGMENTS } from "../../graphql/projects";

type Props = {
  children: any;
};

const CreateProjectMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={CREATE_PROJECT_MUTATION}
      context={{ needAuth: true }}
    >
      {(createProjectMutation, { loading, error, data }) => {
        return children({
          createProjectMutation,
          loading,
          error,
          data
        });
      }}
    </Mutation>
  );
};

export default CreateProjectMutation;
