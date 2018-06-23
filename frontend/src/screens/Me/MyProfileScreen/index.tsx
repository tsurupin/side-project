import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ErrorMessage, UserDetailsView } from "../../../components/Commons";
import { USER_EDIT_SCREEN } from "../../../constants/screens";
import { MyUserQuery } from "../../../queries/users";
import { UserDetails } from "../../../interfaces";
import { USER_EDIT_BUTTON, CANCEL_USER_EDIT_BUTTON, SUBMIT_USER_EDIT_BUTTON } from "../../../constants/buttons";

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

  private handleNavigatorEvent = e => {
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
                title: "Back",
                id: CANCEL_USER_EDIT_BUTTON
              }
            ],
            rightButtons: [
              {
                title: "Submit",
                id: SUBMIT_USER_EDIT_BUTTON
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
          console.log(error);
          if (loading)
            return (
              <View>
                <Text> Text</Text>
              </View>
            );
          if (error)
            return (
              <View>
                <Text> Error</Text>
              </View>
            );

          const myUser: UserDetails = data.myUser;
          console.log("MyProfile", myUser)

          return <UserDetailsView user={myUser} />;
        }}
      </MyUserQuery>
    );
  }
}

export default MyProfileScreen;
