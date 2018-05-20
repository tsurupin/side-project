import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
import { MatchListQuery } from "../../../queries/matches";
import { CHAT_SCREEN, USER_DETAILS_SCREEN } from "../../../constants/screens";
import {
  MatchQueueList,
  ChatList
} from "../../../components/Match/MatchScreen";
import styles from "./styles";

type Props = {
  navigator: any;
};

type State = {};

class MatchScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  protected handleChatPress = (chatId: number): void => {
    this.props.navigator.push({
      screen: CHAT_SCREEN,
      passProps: { id: chatId }
    });
  };

  protected handleUserPress = (userId: number): void => {
    this.props.navigator.push({
      screen: USER_DETAILS_SCREEN,
      passProps: { id: userId, liked: true }
    });
  };

  render() {
    return (
      <View>
        <MatchListQuery>
          {({ data, error, loading }) => {
            if (loading) {
              return <View />;
            }
            if (error) {
              return <View> Error</View>;
            }

            const { likedUserList, chatList } = data.matchList;
           
            return (
              <View>
                <MatchQueueList
                  likedUserList={likedUserList}
                  onPress={this.handleUserPress}
                />
                <ChatList chatList={chatList} onPress={this.handleChatPress} />
              </View>
            );
          }}
        </MatchListQuery>
      </View>
    );
  }
}

export default MatchScreen;
