import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { View } from 'react-native';
import { UserCard, SettingList } from '../../../components/Me/SettingListScreen';
import { MY_PROFILE_SCREEN } from '../../../constants/screens';
import { BACK_BUTTON, USER_EDIT_BUTTON } from '../../../constants/buttons';
import { PENCIL_ICON, BACK_ICON } from '../../../constants/icons';
import { MyUserQuery } from '../../../queries/users';
import { UserDetails, MinimumOutput } from '../../../interfaces';
import IconLoader from '../../../utilities/IconLoader';

import styles from './styles';
import { buildDefaultNavigationComponent } from '../../../utilities/navigationStackBuilder';

type Props = {
  navigator: any;
  componentId: string;
};

type MyUserOutput = {
  data: { myUser: UserDetails };
} & MinimumOutput;

class SettingsListScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  onPress = (screen: string) => {
    Navigation.push(
      this.props.componentId,
      buildDefaultNavigationComponent({
        screenName: screen,
        props: {},
        leftButton: {
          icon: IconLoader.getIcon(BACK_ICON),
          id: BACK_BUTTON
        },
        rightButton: {
          icon: IconLoader.getIcon(PENCIL_ICON),
          title: 'Edit',
          id: USER_EDIT_BUTTON
        }
      })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MyUserQuery>
          {({ data, loading, error }: MyUserOutput) => {
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
