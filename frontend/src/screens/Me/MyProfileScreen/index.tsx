import * as React from 'react';
import { Alert, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { LoadingIndicator } from '../../../components/Common';
import { UserDetailsBox } from '../../../components/Discovery/UserDetailsScreen';
import { USER_EDIT_SCREEN } from '../../../constants/screens';
import { MyUserQuery } from '../../../queries/users';
import { UserDetails, MinimumOutput } from '../../../interfaces';
import { USER_EDIT_BUTTON, BACK_BUTTON, SUBMIT_BUTTON, CLOSE_BUTTON } from '../../../constants/buttons';

import { CLOSE_ICON } from '../../../constants/icons';
import IconLoader from '../../../utilities/IconLoader';
import { buildDefaultNavigationStack } from '../../../utilities/navigationStackBuilder';

type Props = {
  navigator: any;
  componentId: string;
};

type MyUserOutput = {
  data: { myUser: UserDetails };
} & MinimumOutput;

class MyProfileScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case USER_EDIT_BUTTON:
        Navigation.showModal(
          buildDefaultNavigationStack({
            screenName: USER_EDIT_SCREEN,
            props: {},
            title: 'Edit',
            leftButton: {
              icon: IconLoader.getIcon(CLOSE_ICON),
              id: CLOSE_BUTTON
            },
            rightButton: {
              text: 'Change',
              enabled: true,
              id: SUBMIT_BUTTON
            }
          })
        );
        break;
      case BACK_BUTTON:
        Navigation.pop(this.props.componentId);
    }
  };

  render() {
    return (
      <MyUserQuery>
        {({ data, loading, error }: MyUserOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
            return <View/>;
          }
          const myUser: UserDetails = data.myUser;

          return <UserDetailsBox user={myUser} />;
        }}
      </MyUserQuery>
    );
  }
}

export default MyProfileScreen;
