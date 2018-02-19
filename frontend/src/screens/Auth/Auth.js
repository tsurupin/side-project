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


import { signUpMutation } from '../../graphql/mutations';
import { getIdQuery } from '../../graphql/queries';
import { firebaseSignIn } from '../../utilities/firebase';

// import { singUp } from '../../store/actions/accounts';
const FACEBOOK = 'facebook';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
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
    firebaseSignIn(token);
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
      },
      context: {
        needAuth: false
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
