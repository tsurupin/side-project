import * as React from 'react';
import { Mutation } from 'react-apollo';
import { LIKE_PROJECT_MUTATION } from '../../graphql/projectLikes';
import { MY_PROJECT_LIST_QUERY, PROJECT_LIST_QUERY } from '../../graphql/projects';
import { ProjectCore } from '../../interfaces';

type ProjectData = {
  myProjects: ProjectCore[];
  projects: ProjectCore[];
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

          const tmpMyProjects = (projectData as ProjectData).myProjects;
          const newProject = {
            __typename: 'Project',
            id: likeProject.id,
            ...likeProject
          };
          const myProjects = [...tmpMyProjects, newProject];

          cache.writeQuery({
            query: MY_PROJECT_LIST_QUERY,
            data: { myProjects }
          });

          const projectListData = cache.readQuery({
            query: PROJECT_LIST_QUERY
          });

          const tmpProjects = (projectListData as ProjectData).projects;

          const projects = tmpProjects.filter((pr) => pr.id !== likeProject.id);

          cache.writeQuery({
            query: PROJECT_LIST_QUERY,
            data: { projects }
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
