import * as React from 'react';
import { Mutation } from 'react-apollo';
import { CHANGE_PROJECT_STATUS_MUTATION, PROJECT_FRAGMENTS } from '../../graphql/projects';
import { ProjectDetails } from '../../interfaces';

type Props = {
  children: any;
};

type ProjectData = {
  project: ProjectDetails;
};

const ChangeProjectStatusMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={CHANGE_PROJECT_STATUS_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { changeProjectStatus } }) => {
        const fragmentId: string = `Project:${changeProjectStatus.id}`;
        const projectData: ProjectData | null = cache.readFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails
        });

        console.log(projectData, 'changestatus');
        const project = projectData!.project;

        cache.writeFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails,
          data: { project: { ...project, changeProjectStatus } }
        });
      }}
    >
      {(changeProjectStatusMutation, { loading, error, data }) => {
        return children({
          changeProjectStatusMutation,
          loading,
          error,
          data
        });
      }}
    </Mutation>
  );
};

export default ChangeProjectStatusMutation;
