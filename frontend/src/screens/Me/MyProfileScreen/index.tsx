import * as React from 'react';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { UserDetailsBox } from '../../../components/Discovery/UserDetailsScreen';
import {
  BACK_BUTTON,
  CLOSE_BUTTON,
  SUBMIT_BUTTON,
  USER_EDIT_BUTTON,
} from '../../../constants/buttons';
import { USER_EDIT_SCREEN } from '../../../constants/screens';
import { UserDetails } from '../../../interfaces';
import { MyUserQuery } from '../../../queries/users';

import { CLOSE_ICON } from '../../../constants/icons';
import iconLoader from '../../../utilities/iconLoader';
import styles from './styles';

interface Props {
  navigator: any;
}

interface State {}
class MyProfileScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  public render() {
    return (
      <MyUserQuery>
        {({ data, loading, error }) => {
          if (loading) { return <LoadingIndicator />; }
          if (error) { return <ErrorMessage {...error} />; }

          const myUser: UserDetails = data.myUser;

          return <UserDetailsBox user={myUser} />;
        }}
      </MyUserQuery>
    );
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') { return; }

    console.log(e);
    switch (e.id) {
      case USER_EDIT_BUTTON:
        this.props.navigator.showModal({
          screen: USER_EDIT_SCREEN,
          navigatorButtons: {
            leftButtons: [
              {
                icon: iconLoader.getIcon(CLOSE_ICON),
                id: CLOSE_BUTTON,
              },
            ],
            rightButtons: [
              {
                title: 'Submit',
                id: SUBMIT_BUTTON,
              },
            ],
          },
        });
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  }
}

export default MyProfileScreen;
