import * as React from "react";
import {
  View
} from "react-native"
import MessageDetails from "../MessageDetails"
import { Message } from "../../../../interfaces";

type Props = {
  messages: Message[]
  subscribeMessages: () => void
}

type State = {

}

class MessageList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.subscribeMessages();
  } 

  render() {
    const { messages } = this.props;
    return(
      <View>
        {messages.map(message => {
          return <MessageDetails message={message} />
        })}
      </View>
    )
  }
}

export default MessageList;