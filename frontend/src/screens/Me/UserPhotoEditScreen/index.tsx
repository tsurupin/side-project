import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { USER_DISCOVERY_SCREEN, CHAT_SCREEN } from "../../../constants/screens";
import { UserDetailsQuery } from "../../../queries/users";
import {
  UploadUserPhotoMutation,
  DeleteUserPhotoMutation
} from "../../../mutations/users";
import { UserUploadParams } from "../../../interfaces";
import * as ImagePicker from "react-native-image-picker";
import { ReactNativeFile } from '@richeterre/apollo-upload-client';
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

type Props = {
  
};

type State = {};
class UserPhotoEditScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  handlePress = (mutation) => {
    ImagePicker.showImagePicker({}, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const photo = new ReactNativeFile({
          uri: response.uri,
          type: 'image/jpeg',
          name: 'photo.jpg'
        })

        console.log(photo, mutation);
        const variables : UserUploadParams = {photo, rank: 1} 

        mutation({variables})
        
        
        

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        // this.setState({
        //   avatarSource: source
        // });
      }
    });
  }

  render() {
    return(
      <View>
        <UploadUserPhotoMutation>
          {({uploadUserPhotoMutation, data, loading, error}) => {
            console.log("upload user photo", data, loading, error)
            return(
              <Button title="button" onPress={() => this.handlePress(uploadUserPhotoMutation)} /> 
            )
          }}
        </UploadUserPhotoMutation>
      </View>
    );
  }

}

export default UserPhotoEditScreen;
