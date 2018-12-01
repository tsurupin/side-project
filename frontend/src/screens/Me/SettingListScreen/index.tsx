import * as React from 'react';
import { Button, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import {
  SettingList,
  UserCard,
} from '../../../components/Me/SettingListScreen';
import { BACK_BUTTON, USER_EDIT_BUTTON } from '../../../constants/buttons';
import { BACK_ICON, PENCIL_ICON } from '../../../constants/icons';
import { MY_PROFILE_SCREEN } from '../../../constants/screens';
import { UserDetails } from '../../../interfaces';
import { MyUserQuery } from '../../../queries/users';
import iconLoader from '../../../utilities/iconLoader';

import styles from './styles';

interface Props {
  navigator: any;
}

class SettingsListScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  public onPress = (screen: string) => {
    this.props.navigator.push({
      screen,
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(BACK_ICON),
            id: BACK_BUTTON,
          },
        ],
        rightButtons: [
          {
            icon: IconLoader.getIcon(PENCIL_ICON),
            title: 'Edit',
            id: USER_EDIT_BUTTON,
          },
        ],
      },
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <MyUserQuery>
          {({ data, loading, error }) => {
            if (loading) { return <LoadingIndicator />; }
            if (error) { return <ErrorMessage {...error} />; }

            const myUser: UserDetails = data.myUser;
            return (
              <View>
                <UserCard
                  user={myUser}
                  onPress={() => this.onPress(MY_PROFILE_SCREEN)}
                />
                <SettingList onPress={this.onPress} />
              </View>
            );
          }}
        </MyUserQuery>
      </View>
    );
  }
}

export default SettingsListScreen;
