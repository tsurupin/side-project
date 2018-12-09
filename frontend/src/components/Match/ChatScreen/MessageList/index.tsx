import * as React from 'react';
import { ScrollView } from 'react-native';
import MessageItem from '../MessageItem';
import { Message } from '../../../../interfaces';
import styles from './styles';

type Props = {
  messages: Message[];
  subscribeMessages: () => void;
};

class MessageList extends React.Component<Props> {
  private scrollView: any;
  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribeMessages();
  }

  render() {
    const { messages } = this.props;
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
