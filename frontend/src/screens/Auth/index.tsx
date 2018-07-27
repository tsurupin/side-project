import * as React from "react";
import { Text, TouchableOpacity, View, AsyncStorage } from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import { SignUpMutation } from "../../mutations/accounts";
import { LoginStatusQuery } from "../../queries/accounts";
import MainTab from "../MainTab";
import { firebaseSignIn } from "../../utilities/firebase";
import TokenManager from "../../utilities/tokenManager";

const FACEBOOK = "facebook";
const FB_READ_PERMISSIONS = ["public_profile", "email"];

type Props = {};

type State = {};

class AuthScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  private handleFbLogin = (signUpMutation: any): void => {
    TokenManager.setToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImV4cCI6MTUzMjQ5NTUyNiwiaWF0IjoxNTMyNDkxOTI2LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1tMGdqakBzaWRlLXByb2plY3QtOTQ0OGMuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJqdGkiOiIwZTJlMzliNi03M2MxLTQ4Y2UtYmYzYy0wMWUwZWE0ZDJjNmYiLCJuYmYiOjE1MzI0OTE5MjUsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLW0wZ2pqQHNpZGUtcHJvamVjdC05NDQ4Yy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInR5cCI6ImFjY2VzcyIsInVpZCI6InVpZDIifQ.LRJ_P-Cab6jyIeyX-KIQq0fDk6Bb7ktwjAsmRQZktupEE22EocY0KbBF7LobBRBgNdztOqSsrj4RqcvofaXA8R46ZS30MAFiV1ps-5nREBWnz2MR-Q2mHN1xcpsQ_aXfBHIHesaXyWrOxB8Z56ZfPC5GQXEgu8X1YPgRwwEk-4Kl8U4SXhRsIyWkCnbauWghO7rDGhvbQl8I-M9VhXL8Z15YRmba7fVtC6wSOt69HxoPz3i6UWrfppJ1wxzxGSfF8AmiHXVvJz2AqaUarCTik_d9gNs9bLO9E9fEBkCGD4McUcrOHe7E-adAD3z5VIDX3cKNN2OPH6HVd1uS9sDcAQ", "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImV4cCI6MTUzMjQ5NTUyNiwiaWF0IjoxNTMyNDkxOTI2LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1tMGdqakBzaWRlLXByb2plY3QtOTQ0OGMuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJqdGkiOiIwZTJlMzliNi03M2MxLTQ4Y2UtYmYzYy0wMWUwZWE0ZDJjNmYiLCJuYmYiOjE1MzI0OTE5MjUsInN1YiI6ImZpcmViYXNlLWFkbWluc2RrLW0wZ2pqQHNpZGUtcHJvamVjdC05NDQ4Yy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInR5cCI6ImFjY2VzcyIsInVpZCI6InVpZDIifQ.LRJ_P-Cab6jyIeyX-KIQq0fDk6Bb7ktwjAsmRQZktupEE22EocY0KbBF7LobBRBgNdztOqSsrj4RqcvofaXA8R46ZS30MAFiV1ps-5nREBWnz2MR-Q2mHN1xcpsQ_aXfBHIHesaXyWrOxB8Z56ZfPC5GQXEgu8X1YPgRwwEk-4Kl8U4SXhRsIyWkCnbauWghO7rDGhvbQl8I-M9VhXL8Z15YRmba7fVtC6wSOt69HxoPz3i6UWrfppJ1wxzxGSfF8AmiHXVvJz2AqaUarCTik_d9gNs9bLO9E9fEBkCGD4McUcrOHe7E-adAD3z5VIDX3cKNN2OPH6HVd1uS9sDcAQ");
    signUpMutation({
      variables: { providerId: FACEBOOK, uid: "uid2"}
    });
    
    // LoginManager.logInWithReadPermissions(FB_READ_PERMISSIONS)
    //   .then(result => {
    //     if (result.isCancelled) {
    //       return console.log("Login is cancelled");
    //     }

    //     AccessToken.getCurrentAccessToken()
    //       .then(accessTokenData => {
    //         console.log("accessData", accessTokenData);
    //         if (!accessTokenData) { throw "No accessToken" }
    //         signUpMutation({
    //           variables: { providerId: FACEBOOK, uid: accessTokenData.userID }
    //         });
    //       })
    //       .catch(error => console.log("getcurrentaccesserror", error));
    //   })
    //   .catch(error => console.log("loginError", error));
  };

  loginFirebase = async (token: string, loginMutation: any): Promise<void> => {
    try {
 
      await firebaseSignIn(token);

      console.log('hoggg')
      loginMutation({ variables: { logined: true } });
      console.log("firebaseSignIn end")
    } catch (e) {
      console.log("error", e);
    }
  };

  openMainTab = () => {
    MainTab();
  };

  render() {
    return (
      <LoginStatusQuery>
        {({ data }) => {
          if (data && data.logined) {
            this.openMainTab();
            return <View />
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
                  loginData
                }) => {
                  console.log("SignUpMutation", signUpData, error, loginData);
                  if (loading) {
                    return <View>Loading</View>;
                  }
                  if (error) {
                    return <View>Error</View>;
                  }

                  if (signUpData && signUpData.signUp) {
                    console.log("loginFirebase")
                    this.loginFirebase(signUpData.signUp.token, loginMutation);
                    return <View />
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
}

export default AuthScreen;
