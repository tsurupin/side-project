import * as React from "react";
import { Mutation } from "react-apollo";
import {
  DELTE_PROJECT_PHOTO_MUTATION,
  PROJECT_FRAGMENTS
} from "../../graphql/projects";
import { ProjectDetails } from "../../interfaces";

type Props = {
  children: any;
};

const DeleteProjectPhotoMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={DELTE_PROJECT_PHOTO_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { deleteProjectPhoto } }) => {
        const fragmentId: string = `Project:${deleteProjectPhoto.projectId}`;
        const project: ProjectDetails | null = cache.readFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails
        });
        if (!project) {
          return console.error(project);
        }
        const photos = project.photos.filter(
          (photo) => photo.id != deleteProjectPhoto.id
        );

        cache.writeFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails,
          data: { ...project, photos }
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
