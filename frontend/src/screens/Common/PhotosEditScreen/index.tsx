import * as React from "react";
import { View, Alert } from "react-native";
import {
  ErrorMessage,
  PhotosEditForm,
  LoadingIndicator
} from "../../../components/Common";
import {
  UploadProjectPhotoMutation,
  DeleteProjectPhotoMutation
} from "../../../mutations/projects";
import { CLOSE_BUTTON } from "../../../constants/buttons";

import * as ImagePickerHandler from "../../../utilities/imagePickerHandler";
import styles from "./styles";

type Props = {
  navigator: any;
  photos: any[];
  id: string;
};

class PhotosEditScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigationEvent);
  }

  private handleNavigationEvent = (e) => {
    if (e.type !== "NavBarButtonPress") {
      return;
    }
    switch (e.id) {
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private handlePressDeletion = (
    deleteProjectPhotoMutation,
    photoId: string
  ) => {
    deleteProjectPhotoMutation({ variables: { photoId } });
  };

  private handlePress = (rank: number, mutation) => {
    const { id } = this.props;
    ImagePickerHandler.uploadImage({
      variables: { rank, projectId: id },
      onCallback: mutation,
      onError: (message: string) => Alert.alert(message)
    });
  };

  render() {
    let { photos } = this.props;
    console.log("rendering", photos);
    return (
      <View style={styles.container}>
        <DeleteProjectPhotoMutation>
          {({ deleteProjectPhotoMutation, data, loading, error }) => {
            if (loading) return <LoadingIndicator />;
            if (error) return <ErrorMessage {...error} />;
            if (data) {
              const { deleteProjectPhoto } = data;
              console.log(deleteProjectPhoto);
              photos = photos.filter(photo => photo.id == deleteProjectPhoto.id);
              console.log(photos);
            }
            return (
              <UploadProjectPhotoMutation>
                {({ uploadProjectPhotoMutation, data, loading, error }) => {
                  if (loading) return <LoadingIndicator />;
                  if (error) return <ErrorMessage {...error} />;
                  if (data) {
                    console.log(data.updateProjectPhoto)


                  }
                  return (
                    <PhotosEditForm
                      photos={photos}
                      onPressPhoto={(id: string) =>
                        this.handlePressDeletion(deleteProjectPhotoMutation, id)
                      }
                      onPressNewPhoto={(rank: number) =>
                        this.handlePress(rank, uploadProjectPhotoMutation)
                      }
                    />
                  );
                }}
              </UploadProjectPhotoMutation>
            );
          }}
        </DeleteProjectPhotoMutation>
      </View>
    );
  }
}

export default PhotosEditScreen;
