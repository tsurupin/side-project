import * as React from "react";
import { View, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { MessageParams } from "../../../../interfaces";
import * as ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { ReactNativeFile } from "@richeterre/apollo-upload-client";

import styles from "./styles";

type Props = {
  onPress: (variables: MessageParams) => void;
  chatId: string;
};

type State = {
  comment: string | undefined;
  image: any | undefined;
  messageType: string | undefined;
};

class MessageForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      image: undefined,
      messageType: undefined,
    };
  }

  handlePress = () => {
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

          console.log(photo);
          
          this.setState({image: photo, messageType: "upload"});
          this.onPress();
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

  private onPress = () => {
    const { comment, image } = this.state;
    const { chatId } = this.props;
    this.props.onPress({ chatId, comment, image });
  };

  render() {
    const { comment, image } = this.state;
    console.log("current image", image)
    return (
      <View>
        <Input
          placeholder="Add New Message"
          value={comment}
          onChangeText={v => this.setState({ comment: v, messageType: "comment" })}
          onSubmitEditing={this.onPress}
        />
        <Button title="button" onPress={this.handlePress} />
      </View>
    );
  }
}

export default MessageForm;
