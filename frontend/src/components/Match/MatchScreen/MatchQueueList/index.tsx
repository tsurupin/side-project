import * as React from "react";
import { View, ScrollView, Text } from 'react-native';
import { Avatar } from 'react-native-elements'
import styles from "./styles";

import { UserCore } from "../../../../interfaces";

type Props = {
  likedUserList: UserCore[],
  onPress: (number) => void,
}

const MatchQueueList: React.SFC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Match</Text>
      <ScrollView horizontal style={styles.listContainer}>
        {props.likedUserList.map(user => {
          return(
            <Avatar
              key={user.id}
              size="medium"
              avatarStyle={styles.avatar}
              rounded
              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
              onPress={() =>  props.onPress(user.id)}
              activeOpacity={0.7}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default MatchQueueList;