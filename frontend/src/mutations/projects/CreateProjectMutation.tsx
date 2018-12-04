import * as React from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_PROJECT_MUTATION, EDITABLE_PROJECT_LIST_QUERY} from '../../graphql/projects';
import { ProjectCore } from '../../interfaces';
type Props = {
  children: any;
};

type ProjectData = {
  editableProjects: ProjectCore[];
};

const CreateProjectMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={CREATE_PROJECT_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { createProject } }) => {

        // NOTE: reqdQuery cannot return optimistic data yet
        // https://github.com/apollographql/apollo-feature-requests/issues/14
        try {
          const projectData = cache.readQuery({
            query: EDITABLE_PROJECT_LIST_QUERY
          });

          const projects = (projectData as ProjectData).editableProjects;
          const newProject = {
            __typename: 'Project',
            id: createProject.id,
            ...createProject
          };
          const editableProjects = [...projects, newProject];

          cache.writeQuery({
            query: EDITABLE_PROJECT_LIST_QUERY,
            data: { editableProjects }
          });
        } catch (e) {
          console.log('error', e);
        }
      }}
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
