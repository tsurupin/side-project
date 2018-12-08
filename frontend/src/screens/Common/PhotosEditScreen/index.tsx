import * as React from 'react';
import { View, Alert } from 'react-native';
import { ErrorMessage, PhotosEditForm, LoadingIndicator } from '../../../components/Common';
import { UploadProjectPhotoMutation, DeleteProjectPhotoMutation } from '../../../mutations/projects';
import { UploadUserPhotoMutation, DeleteUserPhotoMutation } from '../../../mutations/users';
import { CLOSE_BUTTON } from '../../../constants/buttons';

import * as ImagePickerHandler from '../../../utilities/imagePickerHandler';
import styles from './styles';
import { UserPhoto, ProjectPhoto } from '../../../interfaces';

type Props = {
  navigator: any;
  photos: any[];
  id: string;
  photoType: string;
};

class PhotosEditScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }

  private handleNavigationEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') {
      return;
    }
    switch (e.id) {
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private handlePressDeletion = (mutation: (variables:) => void, photoId: string) => {
    mutation({ variables: { photoId } });
  };

  private handlePress = (rank: number, mutation) => {
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
        {({ deleteUserPhotoMutation, data, loading, error }) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;
          if (data) {
            const { deleteUserPhoto } = data;
            photos = photos.filter((photo) => photo.id !== deleteUserPhoto.id);
          }
          return (
            <UploadUserPhotoMutation>
              {({ uploadUserPhotoMutation, data, loading, error }) => {
                if (loading) return <LoadingIndicator />;
                if (error) return <ErrorMessage {...error} />;
                if (data) {
                  const { uploadUserPhoto } = data;
                  photos = [...photos, uploadUserPhoto];
                }
                return this.renderEditForm(photos, deleteUserPhotoMutation, uploadUserPhotoMutation);
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
        {({ deleteProjectPhotoMutation, data, loading, error }) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;
          if (data) {
            const { deleteProjectPhoto } = data;
            photos = photos.filter((photo) => photo.id !== deleteProjectPhoto.id);
          }
          return (
            <UploadProjectPhotoMutation>
              {({ uploadProjectPhotoMutation, data, loading, error }) => {
                if (loading) return <LoadingIndicator />;
                if (error) return <ErrorMessage {...error} />;
                if (data) {
                  const { uploadProjectPhoto } = data;
                  photos = [...photos, uploadProjectPhoto];
                }
                return this.renderEditForm(photos, deleteProjectPhotoMutation, uploadProjectPhotoMutation);
              }}
            </UploadProjectPhotoMutation>
          );
        }}
      </DeleteProjectPhotoMutation>
    );
  };

  private renderEditForm = (photos, deleteMutation, uploadMutation) => {
    return (
      <PhotosEditForm
        photos={photos}
        onPressPhoto={(id: string) => this.handlePressDeletion(deleteMutation, id)}
        onPressNewPhoto={(rank: number) => this.handlePress(rank, uploadMutation)}
      />
    );
  };

  render() {
    return <View style={styles.container}>{this.renderMutation()}</View>;
  }
}

export default PhotosEditScreen;
