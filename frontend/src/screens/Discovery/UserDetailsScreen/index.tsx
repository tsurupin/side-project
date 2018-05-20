import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { USER_DISCOVERY_SCREEN, CHAT_SCREEN } from "../../../constants/screens";
import { UserDetailsQuery } from "../../../queries/users";
import {
  LikeUserMutation,
  AcceptUserLikeMutation,
  RejectUserLikeMutation
} from "../../../mutations/userLikes";

import styles from "./styles";

type Props = {
  id: number;
  liked: boolean;
  navigator: any;
};

type State = {};
class UserDetailsScreen extends React.Component<Props, State> {
  static defaultProps = {
    liked: false
  };

  constructor(props) {
    super(props);
  }

  private handlePress = mutation => {
    const { id, liked } = this.props;
    const variables = liked ? { userId: id } : { targetUserId: id };

    mutation({ variables });
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

  private renderActionButton = (mutation, data, loading, error) => {
    if (loading) {
      return this.renderLoadingIndicator();
    }
    if (error) {
      return this.renderErrorMessage(error);
    }
    if (data) {
      console.log(data);
      if (data.acceptUserLike) {
        this.props.navigator.push({
          screen: CHAT_SCREEN,
          passProps: { id: data.acceptUserLike.id }
        });
      } else {
        this.props.navigator.push({
          screen: USER_DISCOVERY_SCREEN
        });
      }
    }
    return (
      <TouchableOpacity onPress={() => this.handlePress(mutation)}>
        <Text> UserLike </Text>
      </TouchableOpacity>
    );
  };

  private renderMutationButtons = () => {
    if (this.props.liked) {
      return (
        <View>
          <RejectUserLikeMutation>
            {({ rejectUserLikeMutation, data, loading, error }) => {
              return this.renderActionButton(
                rejectUserLikeMutation,
                data,
                loading,
                error
              );
            }}
          </RejectUserLikeMutation>
          <AcceptUserLikeMutation>
            {({ acceptUserLikeMutation, data, loading, error }) => {
              return this.renderActionButton(
                acceptUserLikeMutation,
                data,
                loading,
                error
              );
            }}
          </AcceptUserLikeMutation>
        </View>
      );
    } else {
      return (
        <View>
          <LikeUserMutation>
            {({ likeUserMutation, data, loading, error }) => {
              return this.renderActionButton(
                likeUserMutation,
                data,
                loading,
                error
              );
            }}
          </LikeUserMutation>
        </View>
      );
    }
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
          return <View>{this.renderMutationButtons()}</View>;
        }}
      </UserDetailsQuery>
    );
  }
}

export default UserDetailsScreen;
