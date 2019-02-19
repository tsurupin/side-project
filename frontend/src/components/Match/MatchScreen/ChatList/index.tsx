import * as React from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Chat } from '../../../../interfaces';
import styles from './styles';

type Props = {
  chats: Chat[];
  onPress: (id: string, name: string) => void;
};

let onPress: any;
const keyExtractor = (item: Chat, _: number) => item.id;

const renderChat = (data: any) => {
  const item: Chat = data.item;
  return (
    <ListItem
      title={item.subject.name}
      subtitle={item.lastComment || ''}
      leftAvatar={{ source: { uri: item.subject.imageUrl } }}
      chevron
      bottomDivider
      topDivider
      onPress={() => onPress(item.id, item.subject.name)}
      containerStyle={styles.itemContainer}
      titleStyle={styles.itemTitle}
      rightSubtitle={item.lastCommentedAt || ''}
    />
  );
};

const ChatList: React.SFC<Props> = (props) => {
  onPress = (id: string, name: string): void => props.onPress(id, name);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chat List</Text>
      <FlatList keyExtractor={keyExtractor} data={props.chats} renderItem={renderChat} />
    </View>
  );
};

export default ChatList;
