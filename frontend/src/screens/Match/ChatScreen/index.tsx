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
import { MessageParams } from "../../../interfaces";

import { MessageList, MessageForm } from "../../../components/Match/ChatScreen";
import styles from "./styles";

type Props = {
  id: string;
  navigator: any;
};

type State = {};
class ChatScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  handlePress = (variables: MessageParams, mutation) => {
    mutation({ variables });
  };

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

              <CreateMessageMutation>
                {({ createMessageMutation, loading, error, data }) => {
                  if (loading) return <View>MessageCreationLoading</View>;
                  if (error) {
                    console.log("messageCreationError", error);
                    return <View>MessageCreationError</View>;
                  }

                  return (
                    <MessageForm
                      onPress={(variables) =>
                        this.handlePress(variables, createMessageMutation)
                      }
                      chatId={chat.id}
                    />
                  );
                }}
              </CreateMessageMutation>
              <MessageList
                subscribeMessages={subscribeMessages}
                messages={chat.messages}
              />
            </View>
          );
        }}
      </ChatDetailsQuery>
    );
  }
}

export default ChatScreen;
