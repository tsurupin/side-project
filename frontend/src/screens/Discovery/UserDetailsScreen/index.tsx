import * as React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { ErrorMessage, LoadingIndicator } from '../../../components/Common';
import { UserDetailsBox } from '../../../components/Discovery/UserDetailsScreen';
import { USER_DISCOVERY_SCREEN, CHAT_SCREEN } from '../../../constants/screens';
import { BACK_BUTTON } from '../../../constants/buttons';
import { UserDetailsQuery } from '../../../queries/users';
import { LikeUserMutation, AcceptUserLikeMutation, RejectUserLikeMutation } from '../../../mutations/userLikes';

import { UserDetails, MinimumOutput } from '../../../interfaces';

type Props = {
  id: string;
  liked: boolean | undefined;
  navigator: any;
};

type RejectUserLikeOutput = {
  rejectUserLikeMutation: () => void;
  data: any;
} & MinimumOutput;

type AcceptUserLikeOutput = {
  acceptUserLikeMutation: () => void;
  data: any;
} & MinimumOutput;

type LikeUserOutput = {
  likeUserMutation: () => void;
  data: any;
} & MinimumOutput;

type UserDetailsOutput = {
  data: { user: UserDetails };
} & MinimumOutput;

type State = {};
class UserDetailsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }) => {
    switch (buttonId) {
      case BACK_BUTTON:
        this.props.navigator.pop();
    }
  };

  private handlePress = (
    mutation: (input: { variables: { userId: string | undefined; targetUserId: string | undefined } }) => void
  ) => {
    const { id, liked } = this.props;
    const variables = liked ? { userId: id, targetUserId: undefined } : { userId: undefined, targetUserId: id };

    mutation({ variables });
  };

  private renderLikedUserDetails = (user: UserDetails) => {
    return (
      <RejectUserLikeMutation>
        {({ rejectUserLikeMutation, data, loading, error }: RejectUserLikeOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;
          if (data) {
            this.props.navigator.push({
              screen: USER_DISCOVERY_SCREEN
            });
            return <View />;
          }

          return (
            <AcceptUserLikeMutation>
              {({ acceptUserLikeMutation, data, loading, error }: AcceptUserLikeOutput) => {
                if (loading) return <LoadingIndicator />;
                if (error) return <ErrorMessage {...error} />;
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
        {({ likeUserMutation, data, loading, error }: LikeUserOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;
          if (data) {
            this.props.navigator.push({
              screen: USER_DISCOVERY_SCREEN
            });
            return <View />;
          }
          return <UserDetailsBox user={user} liked={false} like={() => this.handlePress(likeUserMutation)} />;
        }}
      </LikeUserMutation>
    );
  };

  render() {
    const { id, liked } = this.props;

    return (
      <UserDetailsQuery variables={{ id }}>
        {({ data, loading, error }: UserDetailsOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            return <ErrorMessage {...error} />;
          }

          const user: UserDetails = data.user;

          if (liked === undefined) return <UserDetailsBox user={user} />;
          if (liked) return this.renderLikedUserDetails(user);
          return this.renderUserDetails(user);
        }}
      </UserDetailsQuery>
    );
  }
}

export default UserDetailsScreen;
