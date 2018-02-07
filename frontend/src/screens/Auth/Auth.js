import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tryAuth } from "../../store/actions/index"

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
    console.log('initia')
  }
  state = {
    hoge: 'h'
  }

  fbLoginHandler = () => {
    console.log(FBSDK);
    console.log("aaaaaaaaa")
    console.log(LoginManager);
    console.log(this.state.hoge);
    console.log(LoginManager.logInWithReadPermissions(['email']))
    LoginManager.logInWithReadPermissions(['email']).then(result => {
      if (result.isCancelled) {
        console.log("Login is cancelled")
      } else {
        console.log(result)
        AccessToken.getCurrentAccessToken()
        .then(accessTokenData => {
          const credentials = firebase.auth.FacebookAuthProvider.credential(accessTokenData.accessToken);
          firebase.auth().signInWithCredential(credential)
          .then(result => {
                console.log(result)
          }
        ).catch(error => console.log(error))
        })
        result.grantedPermissions.toString()
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
