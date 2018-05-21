import * as React from "react";
import { View } from "react-native";
import { Input } from 'react-native-elements';
import { MessageParams } from "../../../../interfaces";

import styles from "./styles";

type Props = {
  onPress: (MessageParams) => void;
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

  render() {
    const { comment, image }= this.state;
    const { chatId, onPress } = this.props;
    return (
      <Input
        placeholder="Add New Message"
        value={comment}
        onChangeText={(v) => this.setState({comment: v})}
        onKeyPress={() => onPress({chatId, comment: comment, image: image})}
      />
    )
  }
}

export default MessageForm;
