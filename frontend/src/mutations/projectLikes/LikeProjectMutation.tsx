import * as React from 'react';
import { Mutation } from 'react-apollo';
import { LIKE_PROJECT_MUTATION } from '../../graphql/projectLikes';
import { MY_PROJECT_LIST_QUERY } from '../../graphql/projects';
import { ProjectCore } from '../../interfaces';

type ProjectData = {
  myProjects: ProjectCore[];
};

type Props = {
  children: any;
};

const LikeProjectMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={LIKE_PROJECT_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { likeProject } }) => {
        try {
          const projectData = cache.readQuery({
            query: MY_PROJECT_LIST_QUERY
          });

          const projects = (projectData as ProjectData).myProjects;
          const newProject = {
            __typename: 'Project',
            id: likeProject.id,
            ...likeProject
          };
          const myProjects = [...projects, newProject];

          cache.writeQuery({
            query: MY_PROJECT_LIST_QUERY,
            data: { myProjects }
          });
        } catch (e) {
          console.log('error', e);
        }
      }}
    >
      {(likeProjectMutation, { loading, error, data }) => {
        return children({ likeProjectMutation, loading, error, data });
      }}
    </Mutation>
  );
};

export default LikeProjectMutation;
