import * as React from "react";
import {
  View
} from "react-native"
import MessageDetails from "../MessageDetails"
import { Message } from "../../../../interfaces";

type Props = {
  messages: Message[]
  subscribeMessages?: () => void
}

type State = {

}

class MessageList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  // componentWillReceiveProps(props) {
  //   this.props.subscribeMessages();
  // }

  componentWillMount() {
    this.props.subscribeMessages();
  } 

  render() {
    const { messages } = this.props;
    return(
      <View>
        {messages.slice(1,2).map(message => {
          return <MessageDetails key={message.id} {...message} />
        })}
      </View>
    )
  }
}

export default MessageList;