import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { USER_DISCOVERY_SCREEN, CHAT_SCREEN } from "../../../constants/screens";
import { BACK_BUTTON } from "../../../constants/buttons";
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

  constructor(props: Props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = e => {
    if (e.type !== "NavBarButtonPress") return;
    switch (e.id) {
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  };

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

  private renderActionButton = (mutation, data, loading, error, name) => {
    if (loading) {
      return this.renderLoadingIndicator();
    }
    if (error) {
      return this.renderErrorMessage(error);
    }
    if (data) {
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
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  };

  private renderMutationButtons = () => {
    if (this.props.liked) {
      return (
        <View>
          <RejectUserLikeMutation>
            {({ rejectUserLikeMutation, data, loading, error, name }) => {
              return this.renderActionButton(
                rejectUserLikeMutation,
                data,
                loading,
                error,
                name
              );
            }}
          </RejectUserLikeMutation>
          <AcceptUserLikeMutation>
            {({ acceptUserLikeMutation, data, loading, error, name }) => {
              return this.renderActionButton(
                acceptUserLikeMutation,
                data,
                loading,
                error,
                name
              );
            }}
          </AcceptUserLikeMutation>
        </View>
      );
    } else {
      return (
        <View>
          <LikeUserMutation>
            {({ likeUserMutation, data, loading, error, name }) => {
              return this.renderActionButton(
                likeUserMutation,
                data,
                loading,
                error,
                name
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

          const { userDetails } = data;
          return <View>{this.renderMutationButtons()}</View>;
        }}
      </UserDetailsQuery>
    );
  }
}

export default UserDetailsScreen;
