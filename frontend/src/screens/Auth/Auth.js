import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';

import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from '../../utilities/firebase';


import { signUpMutation, loginMutation } from '../../graphql/mutations';
import { getIdQuery, loginStatusQuery } from '../../graphql/queries';
import { firebaseSignIn } from '../../utilities/firebase';
import { startMainTabs } from '../MainTabs/startMainTab';
// import { singUp } from '../../store/actions/accounts';
const FACEBOOK = 'facebook';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.loginStatus.logined) {
      startMainTabs();
      // move to next screen;
    }
  }


  fetchId = () => {
    console.log("aaaa")
    console.log(this.props.getIdQuery)
    // this.props.getIdQuery().then(re => {
    //     console.log(re)
    // }).catch(error => console.log(error))

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
    console.log(token);
    firebaseSignIn(token).then(() => {
      this.login();
    })
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

export default compose(
  graphql(loginStatusQuery, {name: 'loginStatus'},
  graphql(signUpMutation, {
    name: 'signUp',
    options: props => ({
      variables: {
        providerId: props.providerId,
        uid: props.uid,
      }
    })
  }),
  graphql(loginMutation, {
    name: 'login',
    options: props => ({
      variables: {
        logined: true
      }
    })
  }),
  graphql(getIdQuery, {
    name: 'getIdQuery',
    options: {
      context: {
        needAuth: true
      },
      fetchPolicy: 'network-only',
    }
  }),
  connect(mapStateToProps)
)(AuthScreen);
