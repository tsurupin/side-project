import * as React from 'react';
import { Mutation } from 'react-apollo';
import { UPLOAD_PROJECT_PHOTO_MUTATION, PROJECT_FRAGMENTS } from '../../graphql/projects';
import { ProjectDetails } from '../../interfaces';

type Props = {
  children: any;
};

const UploadProjectPhotoMutation = (props: Props) => {
  const { children } = props;

  return (
    <Mutation
      mutation={UPLOAD_PROJECT_PHOTO_MUTATION}
      context={{ needAuth: true }}
      update={(cache, { data: { uploadProjectPhoto } }) => {
        const fragmentId: string = `Project:${uploadProjectPhoto.projectId}`;
        const project: ProjectDetails | null = cache.readFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails
        });

        if (!project) {
          return console.error(project);
        }

        const { id, rank, imageUrl } = uploadProjectPhoto;
        const newPhoto = { __typename: 'ProjectPhoto', id, rank, imageUrl };

        const photos = [...project.photos, newPhoto];

        cache.writeFragment({
          id: fragmentId,
          fragment: PROJECT_FRAGMENTS.projectDetails,
          data: { ...project, photos }
        });
      }}
    >
      {(uploadProjectPhotoMutation, { loading, error, data }) => {
        return children({
          uploadProjectPhotoMutation,
          loading,
          error,
          data
        });
      }}
    </Mutation>
  );
};

export default UploadProjectPhotoMutation;
