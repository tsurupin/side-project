import * as React from "react";
import { Mutation } from "react-apollo";
import { EDIT_PROJECT_MUTATION, PROJECT_FRAGMENTS } from "../../graphql/projects";

type Props = {
  children: any;
};

const EditProjectMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={EDIT_PROJECT_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { editProject } }) => {
        const fragmentId: string = `Project:${editProject.id}`;
        const { project } = cache.readFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails
        });

        cache.writeFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails,
          data: { project: { ...project, editProject } }
        });
      }}
    >
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
