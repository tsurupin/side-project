import * as React from "react";

import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { CLOSE_BUTTON } from "../../../constants/buttons";
import styles from "./styles";

type Props = {
  keyName: string;
  value: string | undefined;
  onPress: (keyName: string, value: string | undefined) => void;
  navigator: any;
};

type State = {
  value: string | undefined;
  height: number;
};

const DEFAULT_HEIGHT = 40;
class TextInputScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      height: 0
    };
    console.log(props);

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
    const { keyName, onPress } = this.props;
    const { value } = this.state;
    onPress(keyName, value);
    console.log(keyName, value)
    this.props.navigator.dismissModal();

  };

  render() {
    const { value, height } = this.state;
    console.log(`value:${value}, height: ${height}`);
    return (
      <View style={styles.container}>
        <Input
          multiline
          containerStyle={styles.inputContainer}
          inputContainerStyle={[
            styles.inputTextContainer,
            { height: Math.max(DEFAULT_HEIGHT, height) + 20, borderBottomWidth: 0 }
          ]}
          inputStyle={[styles.inputText,  { height: Math.max(DEFAULT_HEIGHT, height) }]}
          value={value}
          onChangeText={(value) => {
            
            this.setState({ value });
          }}
          onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height });
          }}
        />
        <Button
          title="Change"
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={this.onPress}
        />
      </View>
    );
  }
}

export default TextInputScreen;
