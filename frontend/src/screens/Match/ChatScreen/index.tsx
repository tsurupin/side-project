import * as React from 'react';
import {
  AsyncStorage,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { MessageForm, MessageList } from '../../../components/Match/ChatScreen';
import {
  BACK_BUTTON,
} from '../../../constants/buttons';
import { MessageParams } from '../../../interfaces';
import { CreateMessageMutation } from '../../../mutations/chats';
import { ChatDetailsQuery } from '../../../queries/chats';
import styles from './styles';

interface Props {
  id: string;
  navigator: any;
}

interface State {}
class ChatScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  public handlePress = (variables: MessageParams, mutation) => {
    mutation({ variables });
  }

  public render() {
    const id = this.props.id;
    return (
      <ChatDetailsQuery variables={{ id }}>
        {({ subscribeMessages, error, data, loading }) => {
          if (loading) { return <LoadingIndicator />; }
          if (error) {
            return <ErrorMessage {...error} />;
          }
          const { chat } = data;

          return (
            <View style={styles.container}>
              <MessageList
                subscribeMessages={subscribeMessages}
                messages={chat.messages}
              />

              <CreateMessageMutation>
                {({ createMessageMutation, loading, error, data }) => {
                  if (error) {
                    return <ErrorMessage {...error} />;
                  }

                  return (
                    <MessageForm
                      onPress={(variables) =>
                        this.handlePress(variables, createMessageMutation)
                      }
                      chatId={chat.id}
                      submitting={loading}
                    />
                  );
                }}
              </CreateMessageMutation>
            </View>
          );
        }}
      </ChatDetailsQuery>
    );
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') { return; }

    switch (e.id) {
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  }
}

export default ChatScreen;
