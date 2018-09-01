import * as React from "react";
import { Mutation } from "react-apollo";
import { CREATE_PROJECT_MUTATION, PROJECT_FRAGMENTS } from "../../graphql/projects";
import { EDITABLE_PROJECT_LIST_QUERY } from "../../graphql/projects";
type Props = {
  children: any;
};

const CreateProjectMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={CREATE_PROJECT_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { createProject } }) => {    
        const projectData = cache.readQuery({ query: EDITABLE_PROJECT_LIST_QUERY });
        const projects = projectData.editableProjects;
        const newProject = { __typename: "Project", id: createProject.id, ...createProject };
        const editableProjects = [...projects, newProject]
      
        cache.writeQuery({
          query: EDITABLE_PROJECT_LIST_QUERY,
          data: {editableProjects}
        });
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
