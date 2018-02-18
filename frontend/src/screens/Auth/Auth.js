import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID
} from '../../../config';

import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
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
import { signUpMutation } from '../../graphql/mutations';
import { getIdQuery } from '../../graphql/queries';

// import { singUp } from '../../store/actions/accounts';
const FACEBOOK = 'facebook';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
  }


  fetchId = async () => {
    const result = await this.props.getIdQuery().then(r => console.log(r)).catch(e => console.log(e))
  }

  fbLoginHandler = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(result => {

      if (result.isCancelled) { return console.log("Login is cancelled") }

      AccessToken.getCurrentAccessToken()
      .then(accessTokenData => {
        this.signUp(FACEBOOK, accessTokenData.userID)
      }).catch(error => console.log(error))

    }).catch(error => console.log(error))
  }

  signUp = async (providerId, uid) => {
    const result = await this.props.signUp({
      variables: {
        providerId,
        uid
      }
    }).catch(error => console.error(error))

    const token = result.data.signup.token;
    console.log(token)

    firebase.auth().signInWithCustomToken(token)
    .then(result => {
      result.getIdToken(false).then(async (idToken) => {
        console.log(idToken);
        await AsyncStorage.setItem("token", idToken);
      })
    })
    .catch(error => console.log(error))
  }

  render() {

    return (
      <View>
        <TouchableOpacity onPress={this.fbLoginHandler}>
          <Text> Auth Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.fetchId}>
          <Text> Auth Id</Text>
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

// const mapDispatchToProps = dispatch => {
//   return {
//     onLogin: (providerId, uid) => dispatch(singUp(providerId, uid))
//   }
// }

// const gContainer = graphql(signUpMutation, {
//   name: 'signUp',
//   options: props => {
//     variables: {
//       providerId: props.providerId,
//       uid: props.uid
//     }
//   }
// })(AuthScreen);

export default compose(
  graphql(signUpMutation, {
    name: 'signUp',
    options: props => ({
      variables: {
        providerId: props.providerId,
        uid: props.uid,
      }
    })
  }),
  graphql(getIdQuery, {
    name: 'getId'
  }),
  connect(mapStateToProps)
)(AuthScreen);
