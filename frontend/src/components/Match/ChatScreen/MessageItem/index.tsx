import * as React from "react";
import { View, Text, Image } from "react-native";
import { Avatar } from "react-native-elements";

import { UserCore } from "../../../../interfaces";
import styles from "./styles";

type Props = {
  id: string;
  comment?: string;
  imageUrl?: string;
  insertedAt: string;
  user: UserCore;
};

const renderMessage = (
  imageUrl: string | undefined,
  comment: string | undefined
) => {
  if (imageUrl) {
    return (
      <Image
        style={styles.image}
        source={{
          uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
        }}
      />
    );
  } else {
    return <Text style={styles.description}>{comment}</Text>;
  }
};

const MessageItem: React.SFC<Props> = (props) => {
  const { user, comment, imageUrl, insertedAt } = props;
  return (
    <View style={styles.container}>
      <View style={styles.userImageContainer}>
        <Avatar
          key={user.id}
          size="medium"
          avatarStyle={styles.avatar}
          rounded
          source={{
            uri:
              "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
          }}
          onPress={() => console.log(user.id)}
          activeOpacity={0.7}
        />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <Text style={styles.mainText}>{user.displayName}</Text>
          <Text style={styles.subText}>{insertedAt}</Text>
        </View>
        <View style={styles.body}>{renderMessage(imageUrl, comment)}</View>
      </View>
    </View>
  );
};

export default MessageItem;
