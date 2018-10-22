import * as React from "react";
import { View, Alert } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import { MessageParams } from "../../../../interfaces";
import * as ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { ReactNativeFile } from "@richeterre/apollo-upload-client";
import { IMAGE_ICON, ICON_MAIN_TYPE } from "../../../../constants/icons";
import IconLoader from "../../../../utilities/iconLoader";
import styles from "./styles";

type Props = {
  onPress: (variables: MessageParams) => void;
  chatId: string;
  submitting: boolean;
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
      comment: undefined,
      image: undefined,
      messageType: undefined
    };
  }

  handlePress = () => {
    ImagePicker.showImagePicker({}, async (response) => {
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

          this.setState({ image: photo, messageType: "upload" });
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
    const { comment, image, messageType } = this.state;
    const { chatId, submitting } = this.props;
    if (submitting) return;
    this.props.onPress({ chatId, comment, image, messageType });
    this.setState({ comment: undefined, image: undefined });
  };

  render() {
    const { comment } = this.state;
    const { submitting } = this.props;
    const disabled = submitting || comment == undefined || comment == "";

    return (
      <View style={styles.container}>
        <Icon
          size={40}
          color="white"
          containerStyle={styles.iconContainer}
          iconStyle={styles.icon}
          name={IMAGE_ICON}
          type={ICON_MAIN_TYPE}
          onPress={this.handlePress}
        />
        <Input
          containerStyle={styles.inputContainer}
          inputContainerStyle={styles.inputInnerContainer}
          inputStyle={styles.input}
          placeholder="Message"
          value={comment}
          onChangeText={(v) =>
            this.setState({ comment: v, messageType: "comment" })
          }
        />
        <Button
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="Submit"
          disabled={disabled}
          onPress={this.onPress}
        />
      </View>
    );
  }
}

export default MessageForm;
