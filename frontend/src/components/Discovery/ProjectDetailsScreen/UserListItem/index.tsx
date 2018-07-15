import * as React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { UserCore } from "../../../../interfaces";
import styles from './styles';

type Props = {
  user: UserCore;
};

const UserListItem: React.SFC<Props> = (props) => {
  const { user } = props;
  const { displayName, mainPhotoUrl, occupationType } = user;
  return (
    <ListItem
      title={displayName}
      subtitle={occupationType ? occupationType.name : ""}
      leftAvatar={{
        source: { uri: mainPhotoUrl }
      }}
    />
  );
};

export default UserListItem;
