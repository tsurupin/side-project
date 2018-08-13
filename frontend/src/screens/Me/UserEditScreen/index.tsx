import * as React from "react";
import { View, TouchableOpacity, Text, Button, Alert } from "react-native";
import { ErrorMessage, LoadingIndicator,  PhotosEditForm } from "../../../components/Commons";
import { EditForm } from "../../../components/Me/Commons";
import { MyUserQuery } from "../../../queries/users";
import { EditUserMutation } from "../../../mutations/users";

import {
  UploadUserPhotoMutation,
  DeleteUserPhotoMutation
} from "../../../mutations/users";
import { UserDetails, UserEditParams } from "../../../interfaces";
import { uploadImage } from "../../../utilities/imagePickerHandler";
import styles from "./styles";

type Props = {
  id: number;
  navigator: any;
};

class UserEditScreen extends React.Component<Props, UserEditParams> {
  constructor(props) {
    super(props);
  }

  private handlePress = (rank: number, mutation) => {
    uploadImage({
      variables: {rank}, 
      onCallback: mutation,
      onError: (message: string) => Alert.alert(message)
    });
  };

  private handlePressDeletion = (deleteUserPhotoMutation, photoId: string) => {
    deleteUserPhotoMutation({ variables: { photoId } });
  };

  private handleSubmit = (variables: UserEditParams, editUserMutation: any) => {
    editUserMutation({ variables });
  };


  private renderPhotoListEditForm = (user: UserDetails) => {
  
    return (
      <DeleteUserPhotoMutation>
                {({ deleteUserPhotoMutation, data, loading, error }) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;
          return (
            <UploadUserPhotoMutation>
            {({ uploadUserPhotoMutation, data, loading, error }) => {
                if (loading) return <LoadingIndicator />;
                if (error) return <ErrorMessage {...error} />;
                return (
                  <PhotosEditForm
                    photos={user.photos}
                    onPressPhoto={(id: string) =>
                      this.handlePressDeletion(deleteUserPhotoMutation, id)
                    }
                    onPressNewPhoto={(rank: number) =>
                      this.handlePress(rank, uploadUserPhotoMutation)
                    }
                  />
                );
              }}
            </UploadUserPhotoMutation>
          );
        }}
      </DeleteUserPhotoMutation>
    );
  };

  private renderEditForm = (user: UserDetails, defaultProps) => {
    const { genres } = defaultProps;
    return (
      <EditUserMutation>
        {({ editUserMutation, loading, error, data }) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;
          if (data) {
            this.props.navigator.pop();
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
              error={error}
              navigator={this.props.navigator}
            />
          );
        }}
      </EditUserMutation>
    );
  };

  render() {
    return (
      <MyUserQuery>
        {({ data, loading, error }) => {
          console.log(error);
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const user: UserDetails = data.myUser;
          return (
            <View>
               {this.renderPhotoListEditForm(user)}
               {this.renderEditForm(user, {})} 
            </View>
          );
        }}
      </MyUserQuery>
    );
  }
}

export default UserEditScreen;
