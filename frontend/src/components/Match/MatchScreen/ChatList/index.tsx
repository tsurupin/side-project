import * as React from "react";
import { View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { SectionHeader } from "../../../Commons";
import { Chat } from "../../../../interfaces";
import styles from "./styles";

type Props = {
  chats: Chat[];
  onPress: (id: string) => void;
};

let onPress;
const keyExtractor = (item, index) => index;

const renderChat = ({ item }) => {
  return (
    <ListItem
      title={item.name}
      subtitle={item.lastComment || ""}
      leftAvatar={{ source: { uri: item.imageUrl } }}
      chevron
      bottomDivider
      onPress={() => onPress(item.id)}
      containerStyle={styles.itemContainer}
      titleStyle={styles.itemTitle}
    />
  );
};

const ChatList: React.SFC<Props> = (props) => {
  onPress = (id) => props.onPress(id);
  return (
    <View style={styles.container}>
      <SectionHeader title="Chat List" />
      <FlatList
        keyExtractor={keyExtractor}
        data={props.chats}
        renderItem={renderChat}
      />
    </View>
  );
};

export default ChatList;
