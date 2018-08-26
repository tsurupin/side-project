import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  SectionList
} from "react-native";
import { MatchListQuery } from "../../../queries/matches";
import { CHAT_SCREEN, USER_DETAILS_SCREEN } from "../../../constants/screens";
import {
  MatchQueueList,
  ChatList
} from "../../../components/Match/MatchScreen";
import {
  Chat,
  UserCore
} from "../../../interfaces";

import styles from "./styles";
import { LoadingIndicator, ErrorMessage } from "../../../components/Commons";

type Props = {
  navigator: any;
};

type State = {};

class MatchScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log("MatchScreen componentWillMount");
  }

  componentDidMount() {
    console.log("MatchScreen componentDidmount");
  }

  protected handleChatPress = (id: string, name: string): void => {
    console.log("chat", name)
    this.props.navigator.push({
      screen: CHAT_SCREEN,
      title: name,
      passProps: { id }
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
              return <LoadingIndicator />;
            }
            if (error) {
              console.log("matchList error", error)
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
}

export default MatchScreen;
