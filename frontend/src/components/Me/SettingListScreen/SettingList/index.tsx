import * as React from 'react';
import { goToAuthScreen } from '../../../../utilities/navigation';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { LOGOUT_ICON } from '../../../../constants/icons';
import { firebaseSignOut } from '../../../../utilities/firebase';
import styles from './styles';

type Item = {
  title: string;
  iconName: string;
  screen?: string;
};

const logout = async () => {
  return new Promise((resolve, reject) => {
    firebaseSignOut()
      .then(() => {
        goToAuthScreen();
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
    iconName: LOGOUT_ICON
  }
];

type Props = {
  handlePress: (screen: string) => void;
  handleLogout: () => void;
};

const SettingList: React.SFC<Props> = ({ handlePress, handleLogout }) => {
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
            onPress={() => (item.screen ? handlePress(item.screen) : handleLogout())}
          />
        );
      })}
    </View>
  );
};

export default SettingList;
