import * as React from 'react';
import { Mutation } from 'react-apollo';
import { CHANGE_PROJECT_STATUS_MUTATION, PROJECT_FRAGMENTS } from '../../graphql/projects';
import { ProjectDetails } from '../../interfaces';
import { changeLoginStatus } from '../../resolvers/accounts';

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
      update={(cache, { data: { changeProjectStatus: changedProject } }) => {
      
        const fragmentId: string = `Project:${changedProject.id}`;
        const project: ProjectData | null = cache.readFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails
        });
      
        if (!project) {
          return console.error(changedProject);
        };

        cache.writeFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails,
          data: { ...project, status: changedProject.status }
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
