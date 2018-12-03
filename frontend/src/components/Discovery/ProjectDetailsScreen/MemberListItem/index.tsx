import * as React from 'react';
import { ListItem } from 'react-native-elements';
import { UserCore } from '../../../../interfaces';
import styles from './styles';

type Props = {
  member: UserCore;
  onPress: (userId: string) => void;
};

const MemberListItem: React.SFC<Props> = ({ member, onPress }) => {
  const { displayName, mainPhotoUrl, occupationType } = member;
  return (
    <ListItem
      title={displayName}
      containerStyle={styles.container}
      contentContainerStyle={styles.contentContainer}
      titleStyle={styles.title}
      subtitleStyle={styles.subTitle}
      subtitle={occupationType ? occupationType.name : ''}
      leftAvatar={{
        source: { uri: mainPhotoUrl },
      }}
      onPress={() => onPress(member.id)}
    />
  );
};

export default MemberListItem;
