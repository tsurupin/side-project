import * as React from "react";
import { ListItem } from "react-native-elements";
import { UserCore } from "../../../../interfaces";
import styles from './styles';

type Props = {
  member: UserCore;
  onPress: (userId: string) => void; 
};

const MemberListItem: React.SFC<Props> = (props) => {
  const { member, onPress } = props;
  const { displayName, mainPhotoUrl, occupationType } = member;
  return (
    <ListItem
      title={displayName}
      subtitle={occupationType ? occupationType.name : ""}
      leftAvatar={{
        source: { uri: mainPhotoUrl }
      }}
      onPress={() => onPress(member.id)}
    />
  );
};

export default MemberListItem;
