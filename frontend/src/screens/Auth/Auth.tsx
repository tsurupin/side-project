import * as React from 'react';

import { graphql, compose } from 'react-apollo';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as firebase from '../../utilities/firebase';


import  {
  fetchComments,
  submitComment
}  from '../../queries/comments';

import  {
  login,
  signup,
}  from '../../mutations/accounts';

import  {
  checkLoginStatus
}  from '../../queries/accounts';

import { firebaseSignIn } from '../../utilities/firebase';
import startMainTab  from '../MainTabs/StartMainTab';

const FACEBOOK = 'facebook';

type Props = {
  subscribeToNewComments: ({repoName: string}) => void,
  login: () => Promise<any>,
  signup: ({variables: any}) => Promise<any>,
  getIdQuery: () => void,
  comments: () => void,
  submit: () => void,
  signUp: () => void,
}

type State = {
  isLoading: boolean
};

class AuthScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log(this.props)
    //if (this.props.loginStatus.logined) {
    this.props.subscribeToNewComments({
        repoName: 'test'
    });

      //startMainTab();
      // move to next screen;
    //}
  }


  fetchId = () => {
    console.log("aaaa")
    console.log(this.props.getIdQuery)
    // this.props.getIdQuery().then(re => {
    //     console.log(re)
    // }).catch(error => console.log(error))

  }

  submitTest = () => {
    console.log("bbb")
    this.props.submit();
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
    const result = await this.props.signup({
      variables: {
        providerId,
        uid
      }
    }).catch(error => console.error(error))

    const token = result.data.signup.token;
    firebaseSignIn(token).then(() => {
      console.log("login")
      this.props.login()
      .then(() => {
        startMainTab();
      })
      .catch(error => console.error(error));
    })
  }

  render() {

    //console.log(this.props.loginStatus.logined);
    return (
      <View>
        <TouchableOpacity onPress={this.fbLoginHandler}>
          <Text> Auth Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.fetchId}>
          <Text> Auth Id</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.submitTest}>
          <Text> Test22345</Text>
        </TouchableOpacity>
      </View>
    )
  }
};

// const mapStateToProps = state => {
//   return {
//     isLoading: true,
//   }
// }
export default compose(
  fetchComments,
  submitComment,
  // graphql(loginStatusQuery, {name: 'loginStatus'}),
  signup,
  login,
  // graphql(getIdQuery, {
  //   name: 'getIdQuery',
  //   options: {
  //     context: {
  //       needAuth: true
  //     },
  //     fetchPolicy: 'network-only',
  //   }
  // }),
)(AuthScreen);
