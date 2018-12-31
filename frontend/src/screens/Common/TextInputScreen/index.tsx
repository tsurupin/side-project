import * as React from 'react';

import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Input, Button, Icon } from 'react-native-elements';
import { CLOSE_BUTTON } from '../../../constants/buttons';
import { ICON_MAIN_TYPE, CLOSE_CIRCLE_ICON, ICON_BLACK_COLOR, SMALL_ICON_SIZE } from '../../../constants/icons';
import styles from './styles';
import { LabelTextColor } from '../../../constants/colors';
import { TEXT_INPUT_SCREEN } from '../../../constants/screens';

type Props = {
  keyName: string;
  value: string | undefined;
  placeholder: string;
  onPress: (keyName: string, value: string | undefined) => void;
  navigator: any;
};

type State = {
  value: string | undefined;
  height: number;
};

const DEFAULT_HEIGHT = 20;
class TextInputScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
      height: 0
    };

    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case CLOSE_BUTTON:
        Navigation.dismissModal(TEXT_INPUT_SCREEN);
        break;
    }
  };

  private onPress = () => {
    const { keyName, onPress } = this.props;
    const { value } = this.state;
    onPress(keyName, value);
    Navigation.dismissModal(TEXT_INPUT_SCREEN);
  };

  render() {
    const { placeholder } = this.props;
    const { value, height } = this.state;
    return (
      <View style={styles.container}>
        <Input
          multiline
          containerStyle={styles.inputContainer}
          inputContainerStyle={[
            styles.inputTextContainer,
            {
              height: Math.max(DEFAULT_HEIGHT, height) + 20,
              borderBottomWidth: 0
            }
          ]}
          inputStyle={[styles.inputText, { height: Math.max(DEFAULT_HEIGHT, height) }]}
          placeholder={placeholder}
          placeholderTextColor={LabelTextColor}
          value={value}
          rightIcon={
            <Icon
              type={ICON_MAIN_TYPE}
              name={CLOSE_CIRCLE_ICON}
              size={SMALL_ICON_SIZE}
              color={ICON_BLACK_COLOR}
              onPress={() => this.setState({ value: '', height: 0 })}
            />
          }
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
