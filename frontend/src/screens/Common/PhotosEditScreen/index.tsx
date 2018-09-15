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
  }

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
    const { photos } = this.props;
    return (
      <View style={styles.container}>
        <DeleteProjectPhotoMutation>
          {({ deleteProjectPhotoMutation, data, loading, error }) => {
            if (loading) return <LoadingIndicator />;
            if (error) return <ErrorMessage {...error} />;
            return (
              <UploadProjectPhotoMutation>
                {({ uploadProjectPhotoMutation, data, loading, error }) => {
                  if (loading) return <LoadingIndicator />;
                  if (error) return <ErrorMessage {...error} />;
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
