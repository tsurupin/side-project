import * as React from 'react';
import { ListItem } from 'react-native-elements';
import { UserCore } from '../../../../interfaces';
import styles from './styles';

type Props = {
  member: UserCore;
  onPress: (userId: string, name: string) => void;
};

const MemberListItem: React.SFC<Props> = ({ member, onPress }) => {
  const { id, displayName, mainPhotoUrl, occupationType } = member;
  return (
    <ListItem
      title={displayName}
      containerStyle={styles.container}
      contentContainerStyle={styles.contentContainer}
      titleStyle={styles.title}
      subtitleStyle={styles.subTitle}
      subtitle={occupationType ? occupationType.name : ''}
      leftAvatar={{
        source: { uri: mainPhotoUrl }
      }}
      onPress={() => onPress(id, displayName)}
    />
  );
};

export default MemberListItem;
