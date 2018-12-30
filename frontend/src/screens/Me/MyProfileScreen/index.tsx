import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { UserDetailsBox } from '../../../components/Discovery/UserDetailsScreen';
import { USER_EDIT_SCREEN } from '../../../constants/screens';
import { MyUserQuery } from '../../../queries/users';
import { UserDetails, MinimumOutput } from '../../../interfaces';
import { USER_EDIT_BUTTON, BACK_BUTTON, SUBMIT_BUTTON, CLOSE_BUTTON } from '../../../constants/buttons';

import { CLOSE_ICON } from '../../../constants/icons';
import iconLoader from '../../../utilities/IconLoader';

type Props = {
  navigator: any;
};

type MyUserOutput = {
  data: { myUser: UserDetails };
} & MinimumOutput;

class MyProfileScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }) => {
    switch (buttonId) {
      case USER_EDIT_BUTTON:
        this.props.navigator.showModal({
          screen: USER_EDIT_SCREEN,
          navigatorButtons: {
            leftButtons: [
              {
                icon: iconLoader.getIcon(CLOSE_ICON),
                id: CLOSE_BUTTON
              }
            ],
            rightButtons: [
              {
                title: 'Submit',
                id: SUBMIT_BUTTON
              }
            ]
          }
        });
        break;
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  };

  render() {
    return (
      <MyUserQuery>
        {({ data, loading, error }: MyUserOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const myUser: UserDetails = data.myUser;

          return <UserDetailsBox user={myUser} />;
        }}
      </MyUserQuery>
    );
  }
}

export default MyProfileScreen;
