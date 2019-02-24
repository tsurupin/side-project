import * as React from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { SocialIcon } from 'react-native-elements';

import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { SignUpMutation } from '../../mutations/accounts';
import { goToMainTabs } from '../../utilities/navigation';
import { firebaseSignIn } from '../../utilities/firebase';
import { LoadingIndicator } from '../../components/Common';
import { SignUpParams, LoginParams, GraphQLErrorMessage } from '../../interfaces';
import styles from './styles';

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
          Alert.alert('Login is cancelled');
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
          .catch((error) => {
            Alert.alert(`AccessToken error: ${error}`);
          });
      })
      .catch((error) => {
        Alert.alert(`Login Error error: ${error}`);
      });
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
      Alert.alert(`Firebase Error: ${e}`);
    }
  };

  render() {
    return (
      <View>
        <SignUpMutation>
          {({ signUpMutation, loginMutation, loading, error, signUpData }: SignUpOutput) => {
            if (loading) {
              return <LoadingIndicator />;
            }
            if (error) {
              Alert.alert(error.message);
            }

            if (signUpData && signUpData.signUp) {
              this.loginFirebase(signUpData.signUp.token, loginMutation);

              return <View />;
            }

            return (
              <View style={styles.iconContainer}>
                <Text style={styles.title}>Side Project</Text>
                <SocialIcon
                  title="Sign In With Facebook"
                  button
                  type="facebook"
                  style={styles.icon}
                  onPress={() => this.handleFbLogin(signUpMutation)}
                />
              </View>
            );
          }}
        </SignUpMutation>
      </View>
    );
  }
}

export default AuthScreen;
