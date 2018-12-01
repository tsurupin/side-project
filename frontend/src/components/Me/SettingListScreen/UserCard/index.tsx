import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { UserCore } from '../../../../interfaces';
import styles from './styles';

interface Props {
  user: UserCore;
  onPress: () => void;
}

const UserCard: React.SFC<Props> = (props) => {
  const { user, onPress } = props;
  return (
    <TouchableOpacity style={styles.container}>
      <Avatar
        key={user.id}
        size="xlarge"
        avatarStyle={styles.avatar}
        rounded
        source={{
          uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
        onPress={onPress}
        activeOpacity={0.7}
      />
      <Text style={styles.mainText}>{user.displayName}</Text>
      <Text style={styles.subText}>View and Edit Profile</Text>
    </TouchableOpacity>
  );
};

export default UserCard;
