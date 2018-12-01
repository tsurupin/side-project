import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Avatar } from 'react-native-elements';

import {
  ErrorMessage,
  LoadingIndicator,
  PhotosEditForm,
} from '../../../components/Common';
import { EditForm } from '../../../components/Me/Common';
import { EditUserMutation } from '../../../mutations/users';
import { UserEditFormQuery } from '../../../queries/users';

import { CLOSE_BUTTON } from '../../../constants/buttons';
import { CLOSE_ICON } from '../../../constants/icons';
import { PHOTOS_EDIT_SCREEN } from '../../../constants/screens';
import {
  Genre,
  OccupationType,
  UserDetails,
  UserEditParams,
} from '../../../interfaces';
import {
  DeleteUserPhotoMutation,
  UploadUserPhotoMutation,
} from '../../../mutations/users';
import iconLoader from '../../../utilities/iconLoader';
import { uploadImage } from '../../../utilities/imagePickerHandler';
import styles from './styles';

interface Props {
  id: number;
  navigator: any;
}

interface DefaultProps {
  occupationTypes: OccupationType[];
  genres: Genre[];
}

class UserEditScreen extends React.Component<Props, UserEditParams> {
  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <UserEditFormQuery>
        {({ data, loading, error }) => {
          if (loading) { return <LoadingIndicator />; }
          if (error) { return <ErrorMessage {...error} />; }

          const defaultProps: DefaultProps = data.userForm;
          const user: UserDetails = data.myUser;

          return (
            <View style={styles.container}>
              <ScrollView
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
              >
                {this.renderMainPhoto(user)}
                {this.renderEditForm(user, defaultProps)}
              </ScrollView>
            </View>
          );
        }}
      </UserEditFormQuery>
    );
  }

  private handleSubmit = (variables: UserEditParams, editUserMutation: any) => {
    editUserMutation({ variables });
  }

  private handlePressPhoto = (id: string, photos: any[]) => {
    this.props.navigator.showModal({
      screen: PHOTOS_EDIT_SCREEN,
      title: 'Edit Photos',
      passProps: {
        id,
        photos,
        photoType: 'User',
      },
      navigatorButtons: {
        leftButtons: [
          {
            icon: iconLoader.getIcon(CLOSE_ICON),
            title: 'Close',
            id: CLOSE_BUTTON,
          },
        ],
        rightButtons: [
          {
            title: 'Done',
            id: CLOSE_BUTTON,
          },
        ],
      },
    });
  }

  private renderMainPhoto = (user: UserDetails) => {
    const { id, photos } = user;
    return (
      <View style={styles.avatarContainer}>
        <Avatar
          key={id}
          size="xlarge"
          rounded
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
          onPress={() => this.handlePressPhoto(id, photos)}
          activeOpacity={0.7}
        />
      </View>
    );
  }

  private renderEditForm = (user: UserDetails, defaultProps: DefaultProps) => {
    const { genres, occupationTypes } = defaultProps;
    return (
      <EditUserMutation>
        {({ editUserMutation, loading, error, data }) => {
          if (loading) { return <LoadingIndicator />; }
          if (error) { return <ErrorMessage {...error} />; }

          if (data) {
            this.props.navigator.dismissModal();
            return <View />;
          }
          return (
            <EditForm
              user={user}
              onSubmit={(userEditParams: UserEditParams) =>
                this.handleSubmit(userEditParams, editUserMutation)
              }
              loading={loading}
              genres={genres}
              occupationTypes={occupationTypes}
              error={error}
              navigator={this.props.navigator}
            />
          );
        }}
      </EditUserMutation>
    );
  }
}

export default UserEditScreen;
