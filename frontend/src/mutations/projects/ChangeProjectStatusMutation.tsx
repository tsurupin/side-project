import * as React from "react";
import { Mutation } from "react-apollo";
import { CHANGE_PROJECT_STATUS_MUTATION, PROJECT_FRAGMENTS } from "../../graphql/projects";

type Props = {
  children: any;
};

const ChangeProjectStatusMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={CHANGE_PROJECT_STATUS_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { changeProjectStatus } }) => {
        const fragmentId: string = `Project:${changeProjectStatus.id}`;
        const { project } = cache.readFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails
        });

        cache.writeFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails,
          data: { project: { ...project, changeProjectProjectStatus } }
        });
      }}
    >
      {(changeProjectStatusMutation, { loading, error, data }) => {
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

export default ChangeProjectStatusMutation;
