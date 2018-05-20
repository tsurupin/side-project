import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { SignUpMutation, LoginMutation } from "../../mutations/accounts";
import { LoginStatusQuery } from "../../queries/accounts";
import MainTab from "../../screens/MainTab";
import { firebaseSignIn } from "../../utilities/firebase";

const FACEBOOK = "facebook";

type Props = {};

type State = {
  
};

class AuthScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

  
  }

  fbLoginHandler = (signUpMutation: any): void => {
    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => {
        if (result.isCancelled) {
          return console.log("Login is cancelled");
        }

        AccessToken.getCurrentAccessToken()
          .then(accessTokenData => {
            console.log("accessData", accessTokenData);
            signUpMutation({
              variables: { providerId: FACEBOOK, uid: accessTokenData.userID }
            });
          })
          .catch(error => console.log("getcurrentaccesserror", error));
      })
      .catch(error => console.log("loginError", error));
  };

  loginFirebase = async (token: string, loginMutation: any): Promise<void> => {
    try {
      await firebaseSignIn(token);

      loginMutation({ variables: { logined: true } });
   
    } catch (e) {
      console.log(e);
    }
  };

  openMainTab = () => {
    MainTab();
  };


  render() {
    return (
      <LoginStatusQuery>
        {({ data }) => {
          // if (data && data.logined) {
          //   this.openMainTab();
          // }

          return (
            <View>
              <SignUpMutation>
                {({ signUpMutation, loginMutation, loading, error, signUpData, loginData }) => {
                  console.log("SignUpMutation", signUpData, error, loginData)
                  if (loading) { return <View>Loading</View> }
                  if (error) { return <View>Error</View> }
                  if (loginData) {
                    console.log(loginData)
                    console.log("logined!!!!!!!!!!")
                    this.openMainTab();
                  }

                  if (signUpData && signUpData.signUp) {        
                    this.loginFirebase(signUpData.signUp.token, loginMutation);
                  }

                  return (
                    <TouchableOpacity
                      onPress={() => this.fbLoginHandler(signUpMutation)}
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
}

export default AuthScreen;
