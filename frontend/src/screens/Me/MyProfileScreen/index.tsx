import * as React from "react";
import {
  ErrorMessage,
  LoadingIndicator
} from "../../../components/Commons";
import { UserDetailsBox } from "../../../components/Discovery/UserDetailsScreen";
import { USER_EDIT_SCREEN } from "../../../constants/screens";
import { MyUserQuery } from "../../../queries/users";
import { UserDetails } from "../../../interfaces";
import {
  USER_EDIT_BUTTON,
  CLOSE_BUTTON,
  SUBMIT_BUTTON
} from "../../../constants/buttons";

import styles from "./styles";

type Props = {
  navigator: any;
};

type State = {};
class MyProfileScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case USER_EDIT_BUTTON:
        this.props.navigator.showModal({
          screen: USER_EDIT_SCREEN,
          navigatorButtons: {
            leftButtons: [
              {
                //icon: sources[1],
                title: "Close",
                id: CLOSE_BUTTON
              }
            ],
            rightButtons: [
              {
                title: "Submit",
                id: SUBMIT_BUTTON
              }
            ]
          }
        });
    }
  };

  render() {
    return (
      <MyUserQuery>
        {({ data, loading, error }) => {
  
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
