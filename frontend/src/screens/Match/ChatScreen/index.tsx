import * as React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ChatDetailsQuery } from '../../../queries/chats';
import { CreateMessageMutation } from '../../../mutations/chats';
import { MessageParams, MinimumOutput, Chat } from '../../../interfaces';
import { BACK_BUTTON } from '../../../constants/buttons';
import { MessageList, MessageForm } from '../../../components/Match/ChatScreen';
import styles from './styles';
import { LoadingIndicator, ErrorMessage } from '../../../components/Common';
import { CHAT_SCREEN } from '../../../constants/screens';

type Props = {
  id: string;
  navigator: any;
};

type ChatDetailsOutput = {
  data: { chat: Chat };
  subscribeMessages: () => void;
} & MinimumOutput;

type CreateMessageOutput = {
  createMessageMutation: (input: { variables: MessageParams }) => void;
} & MinimumOutput;

class ChatScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case BACK_BUTTON:
        Navigation.pop(CHAT_SCREEN);
    }
  };

  handlePress = (variables: MessageParams, mutation: (input: { variables: MessageParams }) => void) => {
    mutation({ variables });
  };

  render() {
    const id = this.props.id;
    return (
      <ChatDetailsQuery variables={{ chatId: id }}>
        {({ subscribeMessages, error, data, loading }: ChatDetailsOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            return <ErrorMessage {...error} />;
          }
          const { chat } = data;

          return (
            <View style={styles.container}>
              <MessageList subscribeMessages={subscribeMessages} messages={chat.messages} />

              <CreateMessageMutation>
                {({ createMessageMutation, loading, error }: CreateMessageOutput) => {
                  if (error) {
                    return <ErrorMessage {...error} />;
                  }

                  return (
                    <MessageForm
                      onPress={(variables) => this.handlePress(variables, createMessageMutation)}
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
}

export default ChatScreen;
