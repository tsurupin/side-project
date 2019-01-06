import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { View, ScrollView, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';

import { LoadingIndicator } from '../../../components/Common';
import { EditForm } from '../../../components/Me/Common';
import { UserEditFormQuery } from '../../../queries/users';
import { EditUserMutation } from '../../../mutations/users';
import { UserDetails, UserEditParams, OccupationType, Genre, MinimumOutput } from '../../../interfaces';
import styles from './styles';
import { PHOTOS_EDIT_SCREEN } from '../../../constants/screens';
import IconLoader from '../../../utilities/IconLoader';
import { CLOSE_ICON } from '../../../constants/icons';
import { CLOSE_BUTTON, SUBMIT_BUTTON } from '../../../constants/buttons';
import { buildDefaultNavigationStack } from '../../../utilities/navigationStackBuilder';

type Props = {
  id: string;
  navigator: any;
  componentId: string;
};

type DefaultProps = {
  occupationTypes: OccupationType[];
  genres: Genre[];
};

type EditUserOutput = {
  data: any;
  editUserMutation: (input: { variables: UserEditParams }) => void;
} & MinimumOutput;

type UserEditFormOutput = {
  data: { userForm: DefaultProps; myUser: UserDetails };
} & MinimumOutput;

class UserEditScreen extends React.Component<Props, UserEditParams> {
  private form: any;

  constructor(props: Props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case SUBMIT_BUTTON:
        this.form.handleSubmit();
        break;

      case CLOSE_BUTTON:
        Navigation.dismissModal(this.props.componentId);
        break;
    }
  };

  private handleSubmit = (
    variables: UserEditParams,
    editUserMutation: (input: { variables: UserEditParams }) => void
  ) => {
    editUserMutation({ variables });
  };

  private handlePressPhoto = (id: string, photos: any[]) => {
    Navigation.showModal(
      buildDefaultNavigationStack({
        stackId: PHOTOS_EDIT_SCREEN,
        screenName: PHOTOS_EDIT_SCREEN,
        props: {
          id,
          photos,
          photoType: 'User'
        },
        title: 'Edit Photos',
        leftButton: {
          icon: IconLoader.getIcon(CLOSE_ICON),
          id: CLOSE_BUTTON
        },
        rightButton: {
          text: 'Done',
          enabled: true,
          id: CLOSE_BUTTON
        }
      })
    );
  };

  private renderMainPhoto = (user: UserDetails) => {
    const { id, photos, mainPhotoUrl } = user;
    console.log(photos, mainPhotoUrl);
    return (
      <View style={styles.avatarContainer}>
        <Avatar
          key={id}
          size="xlarge"
          rounded
          source={{
            uri: mainPhotoUrl
          }}
          onPress={() => this.handlePressPhoto(id, photos)}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  private renderEditForm = (user: UserDetails, defaultProps: DefaultProps) => {
    const { genres, occupationTypes } = defaultProps;
    return (
      <EditUserMutation>
        {({ editUserMutation, loading, error, data }: EditUserOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
          }
          if (data) {
            Navigation.dismissModal(this.props.componentId);
            return <View />;
          }
          return (
            <EditForm
              user={user}
              onSubmit={(userEditParams: UserEditParams) => this.handleSubmit(userEditParams, editUserMutation)}
              loading={loading}
              genres={genres}
              occupationTypes={occupationTypes}
              error={error}
              ref={(instance) => {
                this.form = instance;
              }}
            />
          );
        }}
      </EditUserMutation>
    );
  };

  render() {
    return (
      <UserEditFormQuery>
        {({ data, loading, error }: UserEditFormOutput) => {
          if (loading) return <LoadingIndicator />;
          if (error) {
            Alert.alert(error.message);
          }
          const defaultProps: DefaultProps = data.userForm;
          const user: UserDetails = data.myUser;

          return (
            <View style={styles.container}>
              <ScrollView alwaysBounceVertical={true} showsVerticalScrollIndicator={false}>
                {this.renderMainPhoto(user)}
                {this.renderEditForm(user, defaultProps)}
              </ScrollView>
            </View>
          );
        }}
      </UserEditFormQuery>
    );
  }
}

export default UserEditScreen;
