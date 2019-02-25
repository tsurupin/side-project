import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { LoadingIndicator } from '../../../components/Common';
import { View, Alert } from 'react-native';
import { UserCard, SettingList } from '../../../components/Me/SettingListScreen';
import { MY_PROFILE_SCREEN } from '../../../constants/screens';
import { BACK_BUTTON, USER_EDIT_BUTTON } from '../../../constants/buttons';
import { PENCIL_ICON, BACK_ICON } from '../../../constants/icons';
import { MyUserQuery } from '../../../queries/users';
import { LogoutMutation } from '../../../mutations/accounts';
import { UserDetails, MinimumOutput } from '../../../interfaces';
import IconLoader from '../../../utilities/IconLoader';
import { firebaseSignOut } from '../../../utilities/firebase';
import { goToAuthScreen } from '../../../utilities/navigation';
import styles from './styles';
import { buildDefaultNavigationComponent } from '../../../utilities/navigationStackBuilder';

type Props = {
  navigator: any;
  componentId: string;
};

type MyUserOutput = {
  data: { myUser: UserDetails };
} & MinimumOutput;

type LogoutOutput = {
  data: { changeLoginStatus: boolean };
  logoutMutation: (input: { variables: { logined: boolean } }) => void;
} & MinimumOutput;

class SettingsListScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private onPress = (screen: string) => {
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
          text: 'Edit',
          id: USER_EDIT_BUTTON
        }
      })
    );
  };

  private handleLogout = async (mutation: (input: { variables: { logined: boolean } }) => void): Promise<void> => {
    try {
      await firebaseSignOut();
      mutation({ variables: { logined: false } });
    } catch (e) {
      Alert.alert(`Firebase Error: ${e}`);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MyUserQuery>
          {({ data, loading, error }: MyUserOutput) => {
            if (loading) return <LoadingIndicator />;
            if (error) {
              Alert.alert(error.message);
              return <View />;
            }
            const myUser: UserDetails = data.myUser;

            return (
              <LogoutMutation>
                {({ logoutMutation, data, loading, error }: LogoutOutput) => {
                  if (loading) {
                    return <LoadingIndicator />;
                  }
                  if (error) {
                    Alert.alert(error.message);
                  }
                  if (data) {
                    goToAuthScreen();
                    return <View />;
                  }

                  return (
                    <View>
                      <UserCard user={myUser} onPress={() => this.onPress(MY_PROFILE_SCREEN)} />
                      <SettingList handlePress={this.onPress} handleLogout={() => this.handleLogout(logoutMutation)} />
                    </View>
                  );
                }}
              </LogoutMutation>
            );
          }}
        </MyUserQuery>
      </View>
    );
  }
}

export default SettingsListScreen;
