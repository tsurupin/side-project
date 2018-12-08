import * as React from 'react';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { View, Button } from 'react-native';
import { ListItem } from 'react-native-elements';
import { UserCard, SettingList } from '../../../components/Me/SettingListScreen';
import { MY_PROFILE_SCREEN } from '../../../constants/screens';
import { BACK_BUTTON, USER_EDIT_BUTTON } from '../../../constants/buttons';
import { PENCIL_ICON, BACK_ICON } from '../../../constants/icons';
import { MyUserQuery } from '../../../queries/users';
import { UserDetails } from '../../../interfaces';
import IconLoader from '../../../utilities/IconLoader';

import styles from './styles';

type Props = {
  navigator: any;
};

class SettingsListScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  onPress = (screen: string) => {
    this.props.navigator.push({
      screen,
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(BACK_ICON),
            id: BACK_BUTTON
          }
        ],
        rightButtons: [
          {
            icon: IconLoader.getIcon(PENCIL_ICON),
            title: 'Edit',
            id: USER_EDIT_BUTTON
          }
        ]
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MyUserQuery>
          {({ data, loading, error }) => {
            if (loading) return <LoadingIndicator />;
            if (error) return <ErrorMessage {...error} />;

            const myUser: UserDetails = data.myUser;
            return (
              <View>
                <UserCard user={myUser} onPress={() => this.onPress(MY_PROFILE_SCREEN)} />
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
