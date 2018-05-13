import * as React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as firebase from '../../utilities/firebase';
import {
  SignupMutation,
  LoginMutation
} from '../../mutations/accounts';

import {
  LoginStatusQuery
} from '../../queries/accounts';

import MainTab from '../../screens/MainTab';

import { firebaseSignIn } from '../../utilities/firebase';
import { access } from 'fs';

const FACEBOOK = 'facebook';

type Props = {
}

type State = {
};

class AuthScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  fbLoginHandler = (signupMutation: any) : void => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(result => {

      if (result.isCancelled) { return console.log("Login is cancelled") }

      AccessToken.getCurrentAccessToken()
      .then(accessTokenData => {
        console.log("accessData", accessTokenData)
        signupMutation({variables: {providerId: FACEBOOK, uid: accessTokenData.userID}});
      }).catch(error => console.log("getcurrentaccesserror", error))

    }).catch(error => console.log("loginError", error))
  }

  loginFirebase = async (token: string, loginMutation: any) : Promise<void> => {

    try {
      await firebaseSignIn(token);
      
      loginMutation({variables: {logined: true}});
      this.openMainTab();
    } catch(e) {
      console.log(e)
    }
  }

  openMainTab = () => {
    MainTab();
  }


  render() {
    return (
      <LoginStatusQuery>
        {({loading, error, logined}) => {
          if (loading) { return <View><Text>loading</Text></View>; }
          if (error) { return <View><Text>{error}</Text></View>; }
          if (logined) {  
            console.log("logined!!!!!!") 
            this.openMainTab();
            return <View><Text>Moving</Text></View>;
          };
          return(
            <View>
              <SignupMutation>
                {({signupMutation, loginMutation, loading, error, data}) => {
                
                  if(data && data.signup) {
                    this.loginFirebase(data.signup.token, loginMutation);
                  } 

                  return(
                    <TouchableOpacity onPress={() => this.fbLoginHandler(signupMutation)}>
                      <Text> Facebook SignIn </Text>
                    </TouchableOpacity>
                  )
                }}
              </SignupMutation>
            </View>
          )
        }}
         </LoginStatusQuery>
      
    )
  }
};


export default AuthScreen;
