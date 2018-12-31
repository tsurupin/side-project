import * as React from 'react';

import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { LOGOUT_ICON } from '../../../../constants/icons';
import { firebaseSignOut } from '../../../../utilities/firebase';
import styles from './styles';

type Item = {
  title: string;
  iconName: string;
  screen?: string;
  fnc?: any;
};

const logout = async () => {
  return new Promise((resolve, reject) => {
    firebaseSignOut()
      .then(() => {
        // Navigation.startSingleScreenApp({
        //   screen: {
        //     screen: AUTH_SCREEN,
        //     title: 'Login'
        //   }
        // });
        resolve();
      })
      .catch((e) => {
        console.error(e);
        reject();
      });
  });
};

const SETTINS_LIST: Item[] = [
  {
    title: 'Log Out',
    iconName: LOGOUT_ICON,
    fnc: () => logout()
  }
];

type Props = {
  onPress: (screen: string) => void;
};

const SettingList: React.SFC<Props> = ({ onPress }) => {
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
