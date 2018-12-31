import * as React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { buildDefaultNavigationComponent } from '../../../utilities/navigationStackBuilder';
import { MatchListQuery } from '../../../queries/matches';
import { CHAT_SCREEN, USER_DETAILS_SCREEN } from '../../../constants/screens';
import { MatchQueueList, ChatList } from '../../../components/Match/MatchScreen';
import { Chat, UserCore, MatchList, MinimumOutput } from '../../../interfaces';
import { BACK_BUTTON } from '../../../constants/buttons';
import { BACK_ICON } from '../../../constants/icons';
import IconLoader from '../../../utilities/IconLoader';
import styles from './styles';
import { LoadingIndicator, ErrorMessage } from '../../../components/Common';

type Props = {
  navigator: any;
};

type MatchListOutput = {
  data: { matchList: MatchList };
} & MinimumOutput;

class MatchScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  protected handleChatPress = (id: string, name: string): void => {
    Navigation.push(
      CHAT_SCREEN,
      buildDefaultNavigationComponent({
        screenName: CHAT_SCREEN,
        props: {
          id
        },
        title: name,
        leftButton: {
          icon: IconLoader.getIcon(BACK_ICON),
          id: BACK_BUTTON
        }
      })
    );
  };

  protected handleUserPress = (userId: string, displayName: string): void => {
    Navigation.push(
      USER_DETAILS_SCREEN,
      buildDefaultNavigationComponent({
        screenName: USER_DETAILS_SCREEN,
        props: {
          id: userId,
          liked: true
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
    return (
      <View style={styles.container}>
        <MatchListQuery>
          {({ data, error, loading }: MatchListOutput) => {
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
                <MatchQueueList likedUserList={likedUserList} onPress={this.handleUserPress} />
                <ChatList chats={chatList} onPress={this.handleChatPress} />
              </View>
            );
          }}
        </MatchListQuery>
      </View>
    );
  }
}

export default MatchScreen;
