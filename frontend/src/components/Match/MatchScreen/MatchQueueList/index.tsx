import * as React from "react";
import { View, Text } from 'react-native';
import { ListItem } from 'react-native-elements'
import styles from "./styles";

import { UserCore } from "../../../../interfaces";

type Props = {
  likedUserList: UserCore[],
  onPress: (number) => void,
}

const MatchQueueList = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Match</Text>
      <View style={styles.listContainer}>
        {props.likedUserList.map(user => {
          return(
            <ListItem
              containerStyle={styles.itemContainer}
              titleStyle={styles.title}
              onPress={() => props.onPress(user.id)}
              key={user.id}
              title={user.displayName}
            />
          )
        })}
      </View>
    </View>
  )
}

export default MatchQueueList;