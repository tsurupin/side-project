import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Alert } from 'react-native';
import { PhotosEditForm, LoadingIndicator } from '../../../components/Common';
import { UploadProjectPhotoMutation, DeleteProjectPhotoMutation } from '../../../mutations/projects';
import { UploadUserPhotoMutation, DeleteUserPhotoMutation } from '../../../mutations/users';
import { CLOSE_BUTTON } from '../../../constants/buttons';

import * as ImagePickerHandler from '../../../utilities/imagePickerHandler';
import styles from './styles';
import {
  UserPhoto,
  ProjectPhoto,
  DeletePhotoParams,
  UploadPhotoParams,
  GraphQLErrorMessage
} from '../../../interfaces';

type Props = {
  photos: UserPhoto[] | ProjectPhoto[];
  id: string;
  componentId: string;
  photoType: string;
};

type DeleteUserPhotoOutput = {
  deleteUserPhotoMutation: (input: { variables: DeletePhotoParams }) => void;
  data: { deleteUserPhoto: UserPhoto };
  loading: boolean;
  error: GraphQLErrorMessage | undefined;
};

type UploadUserPhotoOutput = {
  uploadUserPhotoMutation: (input: { variables: UploadPhotoParams }) => void;
  data: { uploadUserPhoto: UserPhoto };
  loading: boolean;
  error: GraphQLErrorMessage | undefined;
};

type DeleteProjectPhotoOutput = {
  deleteProjectPhotoMutation: (input: { variables: DeletePhotoParams }) => void;
  data: { deleteProjectPhoto: ProjectPhoto };
  loading: boolean;
  error: GraphQLErrorMessage | undefined;
};

type UploadProjectPhotoOutput = {
  uploadProjectPhotoMutation: (input: { variables: UploadPhotoParams }) => void;
  data: { uploadProjectPhoto: UserPhoto };
  loading: boolean;
  error: GraphQLErrorMessage | undefined;
};

class PhotosEditScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case CLOSE_BUTTON:
        Navigation.dismissModal(this.props.componentId);
        break;
    }
  };

  private handlePressDeletion = (photoId: string, mutation: (input: { variables: { photoId: string } }) => void) => {
    mutation({ variables: { photoId } });
  };

  private handlePress = (rank: number, mutation: (input: { variables: UploadPhotoParams }) => void) => {
    const { id } = this.props;
    ImagePickerHandler.uploadImage({
      variables: { rank, projectId: id },
      onCallback: mutation,
      onError: (message: string) => Alert.alert(message)
    });
  };

  private renderMutation = () => {
    const { photos, photoType } = this.props;
    if (photoType === 'User') {
      return this.renderUserPhotoMutation(photos);
    }
    return this.renderProjectPhotoMutation(photos);
  };

  private renderUserPhotoMutation = (photos: UserPhoto[]) => {
    return (
      <DeleteUserPhotoMutation>
        {({ deleteUserPhotoMutation, data, loading, error }: DeleteUserPhotoOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
          }
          let updatedPhotos: UserPhoto[] = photos;
          if (data) {
            const { deleteUserPhoto } = data;
            updatedPhotos = photos.filter((photo) => photo.id !== deleteUserPhoto.id);
          }
          return (
            <UploadUserPhotoMutation>
              {({ uploadUserPhotoMutation, data, loading, error }: UploadUserPhotoOutput) => {
                if (loading) return <LoadingIndicator />;
                if (error) {
                  Alert.alert(error.message);
                }
                if (data) {
                  const { uploadUserPhoto } = data;
                  updatedPhotos = [...photos, uploadUserPhoto];
                }
              
                return this.renderEditForm(updatedPhotos, deleteUserPhotoMutation, uploadUserPhotoMutation);
              }}
            </UploadUserPhotoMutation>
          );
        }}
      </DeleteUserPhotoMutation>
    );
  };

  private renderProjectPhotoMutation = (photos: ProjectPhoto[]) => {
    return (
      <DeleteProjectPhotoMutation>
        {({ deleteProjectPhotoMutation, data, loading, error }: DeleteProjectPhotoOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
            return <View />;
          }
          let updatedPhotos = photos;
          if (data) {
            const { deleteProjectPhoto } = data;
            updatedPhotos = photos.filter((photo) => photo.id !== deleteProjectPhoto.id);
          }
          return (
            <UploadProjectPhotoMutation>
              {({ uploadProjectPhotoMutation, data, loading, error }: UploadProjectPhotoOutput) => {
                if (loading) return <LoadingIndicator />;
                if (error) {
                  Alert.alert(error.message);
                  return <View />;
                }
                if (data) {
                  const { uploadProjectPhoto } = data;
                  updatedPhotos = [...photos, uploadProjectPhoto];
                }
                return this.renderEditForm(updatedPhotos, deleteProjectPhotoMutation, uploadProjectPhotoMutation);
              }}
            </UploadProjectPhotoMutation>
          );
        }}
      </DeleteProjectPhotoMutation>
    );
  };

  private renderEditForm = (
    photos: UserPhoto[] | ProjectPhoto[],
    deleteMutation: (input: { variables: { photoId: string } }) => void,
    uploadMutation: (input: { variables: UploadPhotoParams }) => void
  ) => {
    return (
      <PhotosEditForm
        photos={photos}
        onPressPhoto={(photoId: string) => this.handlePressDeletion(photoId, deleteMutation)}
        onPressNewPhoto={(rank: number) => this.handlePress(rank, uploadMutation)}
      />
    );
  };

  render() {
    return <View style={styles.container}>{this.renderMutation()}</View>;
  }
}

export default PhotosEditScreen;
