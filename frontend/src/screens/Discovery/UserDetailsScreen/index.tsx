import * as React from "react";
import { View, TouchableOpacity, Text, Button } from "react-native";
import { ErrorMessage } from "../../../components/Commons";
import { UserDetailsBox } from "../../../components/Discovery/UserDetailsScreen";
import { USER_DISCOVERY_SCREEN, CHAT_SCREEN } from "../../../constants/screens";
import { BACK_BUTTON } from "../../../constants/buttons";
import { UserDetailsQuery } from "../../../queries/users";
import {
  LikeUserMutation,
  AcceptUserLikeMutation,
  RejectUserLikeMutation
} from "../../../mutations/userLikes";

import styles from "./styles";
import { UserDetails } from "../../../interfaces";

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

  private handleNavigatorEvent = (e) => {
    if (e.type !== "NavBarButtonPress") return;
    switch (e.id) {
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  };

  private handlePress = (mutation) => {
    const { id, liked } = this.props;
    const variables = liked ? { userId: id } : { targetUserId: id };

    mutation({ variables });
  };

  private renderLikedUserDetails = (user: UserDetails) => {
    return (
      <RejectUserLikeMutation>
        {({ rejectUserLikeMutation, data, loading, error }) => {
          if (loading) return <View />;
          if (error) return <View />;
          if (data) {
            this.props.navigator.push({
              screen: USER_DISCOVERY_SCREEN
            });
            return <View />;
          }

          return (
            <AcceptUserLikeMutation>
              {({ acceptUserLikeMutation, data, loading, error }) => {
                if (loading) return <View />;
                if (error) return <View />;
                if (data) {
                  this.props.navigator.push({
                    screen: CHAT_SCREEN,
                    passProps: { id: data.acceptUserLike.id }
                  });
                  return <View />;
                }
                return (
                  <UserDetailsBox
                    user={user}
                    liked={true}
                    rejectLike={() => this.handlePress(rejectUserLikeMutation)}
                    acceptLike={() => this.handlePress(acceptUserLikeMutation)}
                  />
                );
              }}
            </AcceptUserLikeMutation>
          );
        }}
      </RejectUserLikeMutation>
    );
  };

  private renderUserDetails = (user: UserDetails) => {
    return (
      <LikeUserMutation>
        {({ likeUserMutation, data, loading, error }) => {
          if (loading) return <View />;
          if (error) return <View />;
          if (data) {
            this.props.navigator.push({
              screen: USER_DISCOVERY_SCREEN
            });
            return <View />;
          }
          return (
            <UserDetailsBox
              user={user}
              liked={false}
              like={() => this.handlePress(likeUserMutation)}
            />
          );
        }}
      </LikeUserMutation>
    );
  };

  render() {
    const { id, liked } = this.props;

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
          if (error) {
            return (
              <View>
                <Text> Error</Text>
              </View>
            );
          }
          
          const userDetails: UserDetails = data.user;
  
          if (liked) {
            return this.renderLikedUserDetails(userDetails);
          } else {
            return this.renderUserDetails(userDetails);
          }
        }}
      </UserDetailsQuery>
    );
  }
}

export default UserDetailsScreen;
