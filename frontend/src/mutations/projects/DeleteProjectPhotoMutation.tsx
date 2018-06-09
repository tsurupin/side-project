import * as React from "react";
import { Mutation } from "react-apollo";
import { DELTE_PROJECT_PHOTO_MUTATION, PROJECT_FRAGMENTS } from "../../graphql/projects";
import { ProjectDetails } from "../../interfaces";
import { DELETE_USER_PHOTO_MUTATION } from "../../graphql/users";

type Props = {

  children: any;
};

const DeleteProjectPhotoMutation = (props: Props) => {
  const { children } = props;

  return (

    <Mutation
      mutation={DELETE_USER_PHOTO_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { deletProjectPhoto } }) => {
        const fragmentId: string = `Project:${deletProjectPhoto.projectId}`;
        const project: any = cache.readFragment({ 
          id:  fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails 
        });
        const photos = project.photos.filter(photo => photo.id != deletProjectPhoto.id)
        
        cache.writeFragment({ 
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails,
          data: {...project, photos} 
        });
      }}

    >
      {(deleteProjectPhotoMutation, { loading, error, data }) => {
        return children({
          deleteProjectPhotoMutation,
          loading,
          error,
          data
        });
      }}
    </Mutation>
  );
};

export default DeleteProjectPhotoMutation;
