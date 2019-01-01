import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { SignUpMutation } from '../../mutations/accounts';
import { goToMainTabs } from '../../utilities/NavigationManager';
import { firebaseSignIn } from '../../utilities/firebase';
import { LoadingIndicator, ErrorMessage } from '../../components/Common';
import { SignUpParams, LoginParams, GraphQLErrorMessage } from '../../interfaces';

const FACEBOOK = 'facebook';
const FB_READ_PERMISSIONS = ['public_profile', 'email'];

type Props = {};

type SignUpOutput = {
  signUpMutation: (input: { variables: SignUpParams }) => void;
  loginMutation: (input: { variables: LoginParams }) => void;
  loading: boolean;
  error: GraphQLErrorMessage | undefined;
  signUpData?: { signUp: { token: string } };
};

class AuthScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  private handleFbLogin = (signUpMutation: (input: { variables: SignUpParams }) => void) => {
    LoginManager.logInWithReadPermissions(FB_READ_PERMISSIONS)
      .then((result) => {
        if (result.isCancelled) {
          return console.log('Login is cancelled');
        }

        AccessToken.getCurrentAccessToken()
          .then((accessTokenData) => {
            if (!accessTokenData) {
              throw 'No accessToken';
            }
            signUpMutation({
              variables: { providerId: FACEBOOK, uid: accessTokenData.userID }
            });
          })
          .catch((error) => console.log('getcurrentaccesserror', error));
      })
      .catch((error) => console.log('loginError', error));
  };

  private loginFirebase = async (
    token: string,
    loginMutation: (input: { variables: LoginParams }) => void
  ): Promise<void> => {
    try {
      await firebaseSignIn(token);
      loginMutation({ variables: { logined: true } });
      goToMainTabs();
    } catch (e) {
      console.log('error', e);
    }
  };

  render() {
    console.log('auth screen');
    return (
      <View>
        <SignUpMutation>
          {({ signUpMutation, loginMutation, loading, error, signUpData }: SignUpOutput) => {
            if (loading) {
              return <LoadingIndicator />;
            }
            if (error) {
              return <ErrorMessage {...error} />;
            }

            if (signUpData && signUpData.signUp) {
              console.log('loginFirebase');
              this.loginFirebase(signUpData.signUp.token, loginMutation);
              return <View />;
            }

            return (
              <TouchableOpacity onPress={() => this.handleFbLogin(signUpMutation)}>
                <Text> Facebook SignIn </Text>
              </TouchableOpacity>
            );
          }}
        </SignUpMutation>
      </View>
    );
  }
}

export default AuthScreen;
