import * as React from 'react';
import { View, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ActionSheet from 'react-native-actionsheet';
import { ChatDetailsQuery } from '../../../queries/chats';
import { CreateMessageMutation } from '../../../mutations/chats';
import { MessageParams, MinimumOutput, Chat } from '../../../interfaces';
import { BACK_BUTTON, ACTION_SHEET_BUTTON } from '../../../constants/buttons';
import { MessageList, MessageForm } from '../../../components/Match/ChatScreen';
import styles from './styles';
import { LoadingIndicator } from '../../../components/Common';
import { buildDefaultNavigationComponent } from '../../../utilities/navigationStackBuilder';
import { USER_DETAILS_SCREEN, CHAT_SCREEN, PROJECT_DETAILS_SCREEN } from '../../../constants/screens';
import IconLoader from '../../../utilities/IconLoader';
import { BACK_ICON } from '../../../constants/icons';

// add like button for newcomer
const MOVE_TO_SOURCE_INDEX = 0;
const CANCEL_INDEX = 1;
// handle options dynamically
const ACTION_SHEET_OPTIONS = ['See Details', 'Cancel'];

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
  public refs = {
    actionSheet: ActionSheet
  };

  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case ACTION_SHEET_BUTTON:
        this.ActionSheet.show();
        break;
      case BACK_BUTTON:
        Navigation.pop(this.props.componentId);
    }
  };

  private handlePressActionSheet = (index: number, sourceId: string, sourceType: string) => {
    console.log('actionsheet', index);
    const { id } = this.props;
    switch (index) {
      case MOVE_TO_SOURCE_INDEX:
        const screenName = sourceType === 'UserLike' ? USER_DETAILS_SCREEN : PROJECT_DETAILS_SCREEN;

        Navigation.push(
          this.props.componentId,
          buildDefaultNavigationComponent({
            screenName,
            props: {
              id: sourceId
            },
            leftButton: {
              icon: IconLoader.getIcon(BACK_ICON),
              id: BACK_BUTTON
            }
          })
        );
        break;
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
            return <View />;
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
              <ActionSheet
                ref={(o: any) => (this.ActionSheet = o)}
                title={''}
                options={ACTION_SHEET_OPTIONS}
                cancelButtonIndex={CANCEL_INDEX}
                destructiveButtonIndex={CANCEL_INDEX - 1}
                onPress={(index: number) =>
                  this.handlePressActionSheet(index, chat.subject.id, chat.subject.sourceType)
                }
              />
            </View>
          );
        }}
      </ChatDetailsQuery>
    );
  }
}

export default ChatScreen;
