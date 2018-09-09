import * as React from "react";

import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { CLOSE_BUTTON } from "../../../constants/buttons";
import styles from "./styles";

type Props = {
  text: string | undefined;
  onPress: (string) => void;
  navigator: any;
};

type State = {
  text: string | undefined;
  height: number;
};

const DEFAULT_HEIGHT = 40;
class TextInputScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text,
      height: 0
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== "NavBarButtonPress") return;

    switch (e.id) {
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  };

  private onPress = () => {
    const { onPress } = this.props;
    const { text } = this.state;
    onPress(text);
  };

  render() {
    const { text, height } = this.state;
    return (
      <View style={styles.container}>
        <Input
          multiline
          containerStyle={styles.inputContainer}
          inputContainerStyle={[
            styles.inputTextContainer,
            { height: Math.max(DEFAULT_HEIGHT, height) }
          ]}
          inputStyle={styles.inputText}
          value={text}
          onChangeText={(text) => {
            console.log("text change", text);
            this.setState({ text });
          }}
          onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height });
          }}
        />
        <Button
          title="Change"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={this.onPress}
        />
      </View>
    );
  }
}

export default TextInputScreen;
