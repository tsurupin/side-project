import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Message } from '../../../../interfaces';
import MessageItem from '../MessageItem';
import styles from './styles';

interface Props {
  messages: Message[];
  subscribeMessages?: () => void;
}

interface State {}

class MessageList extends React.Component<Props, State> {
  private scrollView;
  constructor(props) {
    super(props);
  }

  public componentWillMount() {
    this.props.subscribeMessages();
  }

  public render() {
    const { messages } = this.props;
    console.log('MessageList', messages);
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
