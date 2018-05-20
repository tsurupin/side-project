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


}

type State = {

}
class ChatScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return(<View/>)
  }
  
}

export default ChatScreen;