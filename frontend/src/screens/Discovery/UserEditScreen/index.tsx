import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { EditForm } from "../../../components/Discovery/UserEditScreen";
import {
  USER_DISCOVERY_SCREEN,
  CHAT_SCREEN,
  USER_DETAILS_SCREEN
} from "../../../constants/screens";
import { MyUserQuery } from "../../../queries/users";
import { EditUserMutation } from "../../../mutations/users";
import { UserDetails, UserEditParams } from "../../../interfaces";
import styles from "./styles";
import { User } from "firebase";

type Props = {
  id: number;
  navigator: any;
};

// add segmented controls by combining this repo
// https://github.com/wix/react-native-custom-segmented-control

class UserEditScreen extends React.Component<Props, UserEditParams> {
  constructor(props) {
    super(props);
  }

  handleSubmit = (userEditParams: UserEditParams, editUserMutation: any) => {
    editUserMutation({ variables: userEditParams });
  };

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

          const { myUser: UserDetails } = data;
          return (
            <View>
              <EditUserMutation>
                {(editUserMutation, loading, error, data) => {
                  if (data) {
                    this.props.navigator.pop({ animated: true });
                    return <View />;
                  }
                  return (
                    <EditForm
                      user={myUser}
                      onSubmit={(userEditParams: UserEditParams) =>
                        this.handleSubmit(userEditParams, editUserMutation)
                      }
                      loading={loading}
                      error={error}
                    />
                  );
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
