import * as React from "react";
import { View, Alert, TouchableOpacity, Text, Button } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { Photo } from "../../../components/Me/UserPhotoEditScreen";
import { USER_DISCOVERY_SCREEN, CHAT_SCREEN } from "../../../constants/screens";
import { UserDetailsQuery } from "../../../queries/users";
import {
  UploadUserPhotoMutation,
  DeleteUserPhotoMutation
} from "../../../mutations/users";
import { MyUserQuery } from "../../../queries/users";
import { UserUploadParams } from "../../../interfaces";
import * as ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { ReactNativeFile } from "@richeterre/apollo-upload-client";
import styles from "./styles";

// var options = {
//   title: 'Select Avatar',
//   customButtons: [
//     {name: 'fb', title: 'Choose Photo from Facebook'},
//   ],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images'
//   }
// };

type Props = {};

type State = {};
class UserPhotoEditScreen extends React.Component<Props, State> {
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

  handlePressDeletion = (mutation, photoId: string) => {
    mutation({ variables: { photoId } });
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
    return (
      <MyUserQuery>
        {({ data, loading, error }) => {
          console.log("myUser", error, data, loading);
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
          console.log(myUser);
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
            </View>
          );
        }}
      </MyUserQuery>
    );
  }
}

export default UserPhotoEditScreen;
