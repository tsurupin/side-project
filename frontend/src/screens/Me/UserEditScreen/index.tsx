import * as React from "react";
import { View, TouchableOpacity, Text, Button, Alert } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { EditForm } from "../../../components/Me/UserEditScreen";
import {
  USER_DISCOVERY_SCREEN,
  CHAT_SCREEN,
  USER_DETAILS_SCREEN
} from "../../../constants/screens";
import { MyUserQuery } from "../../../queries/users";
import { EditUserMutation } from "../../../mutations/users";
import { UserEditParams, UserUploadParams } from "../../../interfaces";
import { Photo } from "../../../components/Me/UserPhotoEditScreen";
import {
  UploadUserPhotoMutation,
  DeleteUserPhotoMutation
} from "../../../mutations/users";
import * as ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { ReactNativeFile } from "@richeterre/apollo-upload-client";

import styles from "./styles";

type Props = {
  id: number;
  navigator: any;
};

class UserEditScreen extends React.Component<Props, UserEditParams> {
  constructor(props) {
    super(props);
  }

  handlePress = mutation => {
    ImagePicker.showImagePicker({}, async response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        try {
          const uri = await ImageResizer.createResizedImage(
            response.uri,
            600,
            600,
            "JPEG",
            100
          );
          const photo = new ReactNativeFile({
            uri,
            type: "image/jpeg",
            name: "photo.jpg"
          });

          console.log(photo, mutation);
          const variables: UserUploadParams = { photo: photo, rank: 252 };

          console.log(variables);
          mutation({ variables });
        } catch (err) {
          console.log(err);
          return Alert.alert(
            "Unable to resize the photo",
            "Check the console for full the error message"
          );
        }
      }
    });
  };

  handlePressDeletion = (deleteUserPhotoMutation, photoId: string) => {
    deleteUserPhotoMutation({ variables: { photoId } });
  };

  handleSubmit = (variables: UserEditParams, editUserMutation: any) => {
    editUserMutation({ variables });
  };

  renderPhotos = (mutation, photos) => {
    return photos.map(photo => {
      return (
        <Photo
          key={photo.id}
          photo={photo}
          onPress={(id: string) => this.handlePressDeletion(mutation, id)}
        />
      );
    });
  };

  render() {
    const { id } = this.props;
    return (
      <MyUserQuery>
        {({ data, loading, error }) => {
          console.log(error);
          if (loading)
            return (
              <View>
                <Text> Text</Text>
              </View>
            );
          if (error)
            return (
              <View>
                <Text> Error</Text>
              </View>
            );

          const { myUser } = data;
          return (
            <View>
               <DeleteUserPhotoMutation>
                {({ deleteUserPhotoMutation, data, loading, error }) => {
                  console.log("delete user photo", data, loading, error);
                  return this.renderPhotos(
                    deleteUserPhotoMutation,
                    myUser.photos
                  );
                }}
              </DeleteUserPhotoMutation>;
              <UploadUserPhotoMutation>
                {({ uploadUserPhotoMutation, data, loading, error }) => {
                  console.log("upload user photo", data, loading, error);
                  return (
                    <Button
                      title="button"
                      onPress={() => this.handlePress(uploadUserPhotoMutation)}
                    />
                  );
                }}
              </UploadUserPhotoMutation>;
              <EditUserMutation>
              {({ editUserMutation, loading, error, data }) => {
                  if (data) {
                    this.props.navigator.pop({ animated: true });
                    return <View />;
                  }
                  return (
                    <EditForm
                      user={myUser}
                      onSubmit={(userEditParams: UserEditParams) =>
                        this.handleSubmit(userEditParams, editUserMutation)
                      }
                      loading={loading}
                      error={error}
                      navigator={this.props.navigator}
                    />
                  );
                }}
              </EditUserMutation>
            </View>
          );
        }}
      </MyUserQuery>
    );
  }
}

export default UserEditScreen;
