import * as React from "react";
import {
  View,
  ScrollView
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

  componentWillMount() {
    this.props.subscribeMessages();
  } 

  render() {

    const { messages } = this.props;
    console.log("MessageList", messages)
    return(
      <View>
         <ScrollView>
          {messages.map(message => {
            return <MessageDetails key={message.id} {...message} />
          })}
        </ScrollView>
      </View>
    )
  }
}

export default MessageList;