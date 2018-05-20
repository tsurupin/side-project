import * as React from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import styles from "./styles";
import { Chat } from "../../../../interfaces";

type Props = {
  chatList: Chat[];
  onPress: (number) => void;
};

const ChatList = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Chat List</Text>
      <View style={styles.listContainer}>
        {props.chatList.map(chat => {
          return (
            <ListItem
              containerStyle={styles.itemContainer}
              titleStyle={styles.title}
              onPress={() => props.onPress(chat.id)}
              key={chat.id}
              title={chat.name}
            />
          );
        })}
      </View>
    </View>
  );
};

export default ChatList;
