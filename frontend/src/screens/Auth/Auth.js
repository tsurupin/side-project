import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tryAuth } from "../../store/actions/index";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID
} from '../../../config';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID
}
const firebaseReference = firebase.initializeApp(firebaseConfig);

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    console.log('initia')
  }

  fbLoginHandler = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(result => {
      if (result.isCancelled) {
        console.log("Login is cancelled")
      } else {
        console.log(result)
        AccessToken.getCurrentAccessToken()
        .then(accessTokenData => {
          console.log(accessTokenData);
          userId = accessTokenData.userID;
          const credentials = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
          console.log(credentials);
          console.log('credential ha')
          firebase.auth().signInWithCredential(credentials)
          .then(result => {
                console.log(result)
          }
          ).catch(error => console.log(error))
        })
        .catch(error => console.log(error))
      }
    }).catch(error => console.log(error))
  }

  render() {

    return (
      <View>
        <TouchableOpacity onPress={this.fbLoginHandler}>
          <Text> Auth Screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
};

const mapStateToProps = state => {
  return {
    isLoading: true,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: () => dispatch(tryAuth())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
