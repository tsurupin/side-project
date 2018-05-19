import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { USER_DISCOVERY_SCREEN } from "../../../constants/screens";
import { UserDetailsQuery } from "../../../queries/users";
import { LikeUserMutation } from "../../../mutations/userLikes";

import styles from "./styles";

type Props = {
  id: number;
  navigator: any;
};

type State = {};
class UserDetailsScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  private handleUserLikePress = likeUserMutation => {
    const { id } = this.props;
    likeUserMutation({ variables: { targetUserId: id } });
  };

  private renderLoadingIndicator = () => {
    return (
      <View>
        <Text>Indicator</Text>
      </View>
    );
  };

  private renderErrorMessage = error => {
    console.log(error);
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  };

  render() {
    const { id } = this.props;
    return (
      <UserDetailsQuery variables={{ id }}>
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
          console.log(data);
          const { userDetails } = data;
          return (
            <View>
              <LikeUserMutation>
                {({ likeUserMutation, data, loading, error }) => {
                  if (loading) {
                    return this.renderLoadingIndicator();
                  }
                  if (error) {
                    return this.renderErrorMessage(error);
                  }
                  if (data) {
                    console.log(data);
                    this.props.navigator.push({
                      screen: USER_DISCOVERY_SCREEN
                    });
                    //TODO: move back to disscovery screen
                  }
                  return (
                    <TouchableOpacity
                      onPress={() => this.handleUserLikePress(likeUserMutation)}
                    >
                      <Text> UserLike </Text>
                    </TouchableOpacity>
                  );
                }}
              </LikeUserMutation>
            </View>
          );
        }}
      </UserDetailsQuery>
    );
  }
}

export default UserDetailsScreen;
