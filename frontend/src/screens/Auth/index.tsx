import * as React from 'react';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { SignUpMutation } from '../../mutations/accounts';
import { LoginStatusQuery } from '../../queries/accounts';
import { firebaseSignIn } from '../../utilities/firebase';
import MainTab from '../MainTab';

const FACEBOOK = 'facebook';
const FB_READ_PERMISSIONS = ['public_profile', 'email'];

interface Props {}

interface State {}

class AuthScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  public loginFirebase = async (token: string, loginMutation: any): Promise<void> => {
    try {
      await firebaseSignIn(token);

      console.log('hoggg');
      loginMutation({ variables: { logined: true } });
      console.log('firebaseSignIn end');
    } catch (e) {
      console.log('error', e);
    }
  }

  public openMainTab = () => {
    MainTab();
  }

  public render() {
    return (
      <LoginStatusQuery>
        {({ data }) => {
          if (data && data.logined) {
            this.openMainTab();
            return <View />;
          }

          return (
            <View>
              <SignUpMutation>
                {({
                  signUpMutation,
                  loginMutation,
                  loading,
                  error,
                  signUpData,
                  loginData,
                }) => {
                  if (loading) {
                    return <View>Loading</View>;
                  }
                  if (error) {
                    return <View>Error</View>;
                  }

                  if (signUpData && signUpData.signUp) {
                    console.log('loginFirebase');
                    this.loginFirebase(signUpData.signUp.token, loginMutation);
                    return <View />;
                  }

                  return (
                    <TouchableOpacity
                      onPress={() => this.handleFbLogin(signUpMutation)}
                    >
                      <Text> Facebook SignIn </Text>
                    </TouchableOpacity>
                  );
                }}
              </SignUpMutation>
            </View>
          );
        }}
      </LoginStatusQuery>
    );
  }

  private handleFbLogin = (signUpMutation: any): void => {
    LoginManager.logInWithReadPermissions(FB_READ_PERMISSIONS)
      .then((result) => {
        if (result.isCancelled) {
          return console.log('Login is cancelled');
        }

        AccessToken.getCurrentAccessToken()
          .then((accessTokenData) => {
            console.log('accessData', accessTokenData);
            if (!accessTokenData) {
              throw new Error('No accessToken');
            }
            signUpMutation({
              variables: { providerId: FACEBOOK, uid: accessTokenData.userID },
            });
          })
          .catch((error) => console.log('getcurrentaccesserror', error));
      })
      .catch((error) => console.log('loginError', error));
  }
}

export default AuthScreen;
