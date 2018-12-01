import * as React from 'react';

import { View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { CLOSE_BUTTON } from '../../../constants/buttons';
import { LabelTextColor } from '../../../constants/colors';
import { CLOSE_CIRCLE_ICON, ICON_MAIN_TYPE } from '../../../constants/icons';
import styles from './styles';

interface Props {
  keyName: string;
  value: string | undefined;
  placeholder: string;
  onPress: (keyName: string, value: string | undefined) => void;
  navigator: any;
}

interface State {
  value: string | undefined;
  height: number;
}

const DEFAULT_HEIGHT = 20;
class TextInputScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      height: 0,
    };
    console.log(props);

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  public render() {
    const { placeholder } = this.props;
    const { value, height } = this.state;
    console.log(`value:${value}, height: ${height}`);
    return (
      <View style={styles.container}>
        <Input
          multiline
          containerStyle={styles.inputContainer}
          inputContainerStyle={[
            styles.inputTextContainer,
            {
              height: Math.max(DEFAULT_HEIGHT, height) + 20,
              borderBottomWidth: 0,
            },
          ]}
          inputStyle={[
            styles.inputText,
            { height: Math.max(DEFAULT_HEIGHT, height) },
          ]}
          placeholder={placeholder}
          placeholderTextColor={LabelTextColor}
          value={value}
          rightIcon={
            <Icon
              type={ICON_MAIN_TYPE}
              name={CLOSE_CIRCLE_ICON}
              size={24}
              color="black"
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

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') { return; }

    switch (e.id) {
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  }

  private onPress = () => {
    const { keyName, onPress } = this.props;
    const { value } = this.state;
    onPress(keyName, value);
    console.log(keyName, value);
    this.props.navigator.dismissModal();
  }
}

export default TextInputScreen;
