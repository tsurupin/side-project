import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
import { ChatDetailsQuery } from "../../../queries/chats";
import { CHAT_SCREEN } from "../../../constants/screens";
import {
  CommentList,
  CommentForm
} from "../../../components/Match/ChatScreen";
import styles from "./styles";


type Props = {
  id: string,
  navigator: any;
}

type State = {

}
class ChatScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {

    const id = this.props.id
    return(
    <View>
      <ChatDetailsQuery variables={id}>
        {({subscribeComments}) => {
            <CommentList subscribeComments={subscribeComments} />
        }}
      </ChatDetailsQuery>
    </View>
    )
  }
  
}

export default ChatScreen;