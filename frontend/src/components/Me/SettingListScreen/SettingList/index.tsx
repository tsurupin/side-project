import * as React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { LOGOUT_ICON, PENCIL_ICON } from '../../../../constants/icons';
import { firebaseSignOut } from '../../../../utilities/firebase';
import styles from './styles';

interface Item {
  title: string;
  iconName: string;
  screen?: string;
  fnc?: any;
}

const SETTINS_LIST: Item[] = [
  {
    title: 'Log Out',
    iconName: LOGOUT_ICON,
    fnc: () => firebaseSignOut(),
  },
];

interface Props {
  onPress: (string) => void;
}

const SettingList: React.SFC<Props> = (props) => {
  const { onPress } = props;
  return (
    <View>
      {SETTINS_LIST.map((item) => {
        return (
          <ListItem
            key={item.title}
            title={item.title}
            chevron
            topDivider
            bottomDivider
            containerStyle={styles.itemContainer}
            titleStyle={styles.itemTitle}
            leftIcon={{ name: item.iconName }}
            onPress={() => (item.screen ? onPress(item.screen) : item.fnc())}
          />
        );
      })}
    </View>
  );
};

export default SettingList;
