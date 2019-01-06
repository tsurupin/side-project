import * as React from 'react';
import { View, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ChatDetailsQuery } from '../../../queries/chats';
import { CreateMessageMutation } from '../../../mutations/chats';
import { MessageParams, MinimumOutput, Chat } from '../../../interfaces';
import { BACK_BUTTON } from '../../../constants/buttons';
import { MessageList, MessageForm } from '../../../components/Match/ChatScreen';
import styles from './styles';
import { LoadingIndicator } from '../../../components/Common';
import { buildDefaultNavigationComponent } from '../../../utilities/navigationStackBuilder';
import { USER_DETAILS_SCREEN } from '../../../constants/screens';
import IconLoader from '../../../utilities/IconLoader';
import { BACK_ICON } from '../../../constants/icons';

type Props = {
  id: string;
  componentId: string;
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
        Navigation.pop(this.props.componentId);
    }
  };

  private handlePress = (variables: MessageParams, mutation: (input: { variables: MessageParams }) => void) => {
    mutation({ variables });
  };

  private handlePressUser = (userId: string, displayName: string) => {
    Navigation.push(
      this.props.componentId,
      buildDefaultNavigationComponent({
        screenName: USER_DETAILS_SCREEN,
        props: {
          id: userId
        },
        title: displayName,
        leftButton: {
          icon: IconLoader.getIcon(BACK_ICON),
          id: BACK_BUTTON
        }
      })
    );
  };

  render() {
    const id = this.props.id;
    return (
      <ChatDetailsQuery variables={{ chatId: id }}>
        {({ subscribeMessages, error, data, loading }: ChatDetailsOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
          }
          const { chat } = data;

          return (
            <View style={styles.container}>
              <MessageList
                subscribeMessages={subscribeMessages}
                messages={chat.messages}
                handlePress={this.handlePressUser}
              />

              <CreateMessageMutation>
                {({ createMessageMutation, loading, error }: CreateMessageOutput) => {
                  if (error) {
                    Alert.alert(error.message);
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
