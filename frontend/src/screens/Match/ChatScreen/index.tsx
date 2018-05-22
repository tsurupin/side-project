import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
import { ChatDetailsQuery } from "../../../queries/chats";
import { CreateMessageMutation } from "../../../mutations/chats";
import { CHAT_SCREEN } from "../../../constants/screens";
import { MessageList, MessageForm } from "../../../components/Match/ChatScreen";
import styles from "./styles";
import createMessage from "../../../mutations/chats/createMessage";
import { Subscription } from "react-apollo";
import { CHAT_QUERY, NEW_MESSAGE_SUBSCRIPTION } from "../../../graphql/chats";

type Props = {
  id: string;
  navigator: any;
};

type State = {};
class ChatScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    const id = this.props.id;
    return (
      <ChatDetailsQuery variables={{ id }}>
        {({ subscribeMessages, error, data, loading }) => {
          if (loading) return <View>Loading</View>;
          if (error) {
            console.log("ChatDetailsQuery", error);
            return <View>Error</View>;
          }
          const { chat } = data;
         
          return (
            <View>
              <Text>{chat.name}</Text>
              <MessageList
                // subscribeMessages={subscribeMessages}
                messages={chat.messages}
              />
              <Subscription subscription={NEW_MESSAGE_SUBSCRIPTION} variables={{chatId: "1"}}>
              {({data, loading, error}) => {
                console.log("Subscription", data, loading, error)
                return <View />
              }}
              </Subscription>

              <CreateMessageMutation>
                {({ createMessageMutation, loading, error, data }) => {
                  if (loading) return <View>MessageCreationLoading</View>;
                  if (error) {
                    console.log("messageCreationError", error);
                    return <View>MessageCreationError</View>;
                  }
                  if (data) {
                    console.log("updated", data)
                    subscribeMessages();
                  }
                  console.log("MessageCreationData", data);
                  return (
                    <MessageForm onPress={createMessageMutation} chatId={chat.id} />
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
