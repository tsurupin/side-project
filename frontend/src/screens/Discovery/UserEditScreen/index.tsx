import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { EditForm } from "../../../components/Discovery/UserEditScreen";
import { USER_DISCOVERY_SCREEN, CHAT_SCREEN } from "../../../constants/screens";
import { MyUserQuery } from "../../../queries/users";
import {
  EditUserMutation
} from "../../../mutations/users";
import {
  USER_EDIT_SUBMIT_BUTTON
} from "../../../constants/buttons";
import styles from "./styles";

type Props = {
  id: number;
  liked: boolean;
  navigator: any;
};

type InputProps = {
  displayName: string;
  introduction?: string;
  occupation?: string;
  occupationTypeId?: number;
  genreId?: number;
  skillIds?: number[];
  companyName?: string;
  schoolName?: string;
  latitude?: number;
  longitude?: number;
};

// type Variables = {
//   displayName: string;
//   introduction?: string;
//   occupation?: string;
//   occupationTypeId?: number;
//   genreId?: number;
//   skillIds?: number[];
//   companyName?: string;
//   schoolName?: string;
//   latitude?: number;
//   longitude?: number;
// };

type State = {
  displayName: string;
  introduction?: string;
  occupation?: string;
  occupationTypeId?: number;
  genreId?: number;
  skillIds?: number[];
  companyName?: string;
  schoolName?: string;
};

// add segmented controls by combining this repo
// https://github.com/wix/react-native-custom-segmented-control

class UserEditScreen extends React.Component<Props, State> {
  static defaultProps = {
    liked: false
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  handleNavigatorEvent = (e) => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case USER_EDIT_SUBMIT_BUTTON:

        this.props.navigator.showModal({
          screen: USER_SEARCH_MODAL_SCREEN,
          passProps: { onSubmit: this.handleUpdateSearchParams },
          navigatorButtons: {
            leftButtons: [
              {
                //icon: sources[1],
                title: "Back",
                id: CANCEL_USER_SEARCH_BUTTON
              }
            ],
            rightButtons: [
              {
                title: "Submit",
                id: SUBMIT_USER_SEARCH_BUTTON
              }
            ]
          }
        });
    }

  }

  handleChange = (key: string, value: string) => {
    let updateParam = {}
    updateParam[key] = value;
    this.setState(updateParam)
  }

  handleSubmit = (editUserMutation: any) => {
    const updateParams = {}

    editUserMutation({variables: updateParams});
  }
  
  render() {
    const { id } = this.props;
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

          const { myUser } = data;
          return(
            <View>
              <EditUserMutation>
                {(editUserMutation, loading, error, data) => {
                  <EditForm user={myUser} onChange={this.handleChange} onSubmit={() => this.handleSubmit(editUserMutation)} />
                }}
                
              </EditUserMutation>  
            </View>
          );
        }}
      </MyUserQuery>
    );
  }
}

export default UserEditScreen;
