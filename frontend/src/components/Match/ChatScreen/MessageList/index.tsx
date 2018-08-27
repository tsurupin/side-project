import * as React from "react";
import { View, ScrollView } from "react-native";
import MessageItem from "../MessageItem";
import { Message } from "../../../../interfaces";
import styles from "./styles";

type Props = {
  messages: Message[];
  subscribeMessages?: () => void;
};

type State = {};

class MessageList extends React.Component<Props, State> {
  private scrollView;
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribeMessages();
  }

  render() {
    const { messages } = this.props;
    console.log("MessageList", messages);
    return (
      <ScrollView
        style={styles.container}
        pagingEnabled
        ref={(ref) => (this.scrollView = ref)}
        onContentSizeChange={() => {
          this.scrollView.scrollToEnd({ animated: false });
        }}
      >
        >
        {messages.map((message) => {
          return <MessageItem key={message.id} {...message} />;
        })}
      </ScrollView>
    );
  }
}

export default MessageList;
