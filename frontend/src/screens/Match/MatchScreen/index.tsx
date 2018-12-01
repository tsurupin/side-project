import * as React from 'react';
import {
  AsyncStorage,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import {
  ChatList,
  MatchQueueList,
} from '../../../components/Match/MatchScreen';
import {
  BACK_BUTTON,
} from '../../../constants/buttons';
import { BACK_ICON } from '../../../constants/icons';
import { CHAT_SCREEN, USER_DETAILS_SCREEN } from '../../../constants/screens';
import { Chat, UserCore } from '../../../interfaces';
import { MatchListQuery } from '../../../queries/matches';
import iconLoader from '../../../utilities/iconLoader';
import styles from './styles';

interface Props {
  navigator: any;
}

interface State {}

class MatchScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <View style={styles.container}>
        <MatchListQuery>
          {({ data, error, loading }) => {
            if (loading) {
              return <LoadingIndicator />;
            }
            if (error) {
              return <ErrorMessage {...error} />;
            }

            const likedUserList: UserCore[] = data.matchList.likedUserList;
            const chatList: Chat[] = data.matchList.chatList;

            return (
              <View>
                <MatchQueueList
                  likedUserList={likedUserList}
                  onPress={this.handleUserPress}
                />
                <ChatList chats={chatList} onPress={this.handleChatPress} />
              </View>
            );
          }}
        </MatchListQuery>
      </View>
    );
  }

  protected handleChatPress = (id: string, name: string): void => {

    this.props.navigator.push({
      screen: CHAT_SCREEN,
      title: name,
      passProps: { id },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(BACK_ICON),
            id: BACK_BUTTON,
          },
        ],
      },
    });
  }

  protected handleUserPress = (
    userId: number,
    userDisplayName: string,
  ): void => {
    this.props.navigator.push({
      screen: USER_DETAILS_SCREEN,
      title: userDisplayName,
      passProps: { id: userId, liked: true },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(BACK_ICON),
            id: BACK_BUTTON,
          },
        ],
      },
    });
  }
}

export default MatchScreen;
