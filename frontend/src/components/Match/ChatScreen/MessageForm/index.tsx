import * as React from "react";
import { View } from "react-native";
import { Input, Button } from 'react-native-elements';
import { MessageParams } from "../../../../interfaces";

import styles from "./styles";

type Props = {
  onPress: (variables: MessageParams) => void;
  chatId: string;
};

type State = {
  comment: string | undefined,
  image: undefined
};

class MessageForm extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      image: undefined
    }
  }

  private onPress = () => {
    const { comment, image } = this.state;
    const { chatId, onPress } = this.props;
    this.props.onPress({chatId, comment, image})
  }

  render() {
    const { comment, image }= this.state;
    const { chatId, onPress } = this.props;
    return (
      <View>
        <Input
          placeholder="Add New Message"
          value={comment}
          onChangeText={(v) => this.setState({comment: v})}
          onSubmitEditing={this.onPress}
        />
      </View>
    )
  }
}

export default MessageForm;
