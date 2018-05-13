import * as React from 'react';

// import { graphql, compose } from 'react-apollo';
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
  LoginMutation,
  LogoutMutation
} from '../../mutations/accounts';
import {
  LoginStatusQuery
} from '../../queries/accounts';

// import  {
//   fetchComments,
//   submitComment
// }  from '../../queries/comments';

// import  {
//   login,
//   signup,
// }  from '../../mutations/accounts';

// import  {
//   checkLoginStatus
// }  from '../../queries/accounts';

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

  componentWillMount() {

    //if (this.props.loginStatus.logined) {
    // this.props.subscribeToNewComments({
    //     repoName: 'test'
    // });

    // if (this.props.loginStatus.logined) {
    //   MainTab();
    // }

      //startMainTab();
      // move to next screen;
    //}
  }


  // fetchId = () => {
  //   console.log("aaaa")
  //   console.log(this.props.getIdQuery)
  //   // this.props.getIdQuery().then(re => {
  //   //     console.log(re)
  //   // }).catch(error => console.log(error))

  // }

  // submitTest = () => {
  //   console.log("bbb")
  //   this.props.submit();
  //   // this.props.getIdQuery().then(re => {
  //   //     console.log(re)
  //   // }).catch(error => console.log(error))

  // }

  fbLoginHandler = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(result => {

      if (result.isCancelled) { return console.log("Login is cancelled") }

      AccessToken.getCurrentAccessToken()
      .then(accessTokenData => {
        console.log("accessData", accessTokenData)
        SignupMutation(
          {providerId: FACEBOOK, uid: accessTokenData.userID}, 
          {updateFirebase: this.updateFirebase, updateErrorMessage: this.updateErrorMessage}
        )
        //this.signUp(FACEBOOK, accessTokenData.userID)
      }).catch(error => console.log("getcurrentaccesserror", error))

    }).catch(error => console.log("loginError", error))
  }

  signUp = async (providerId, uid) => {
    return SignupMutation(
      {providerId, uid}, 
      {updateFirebase: this.updateFirebase, updateErrorMessage: this.updateErrorMessage}
    )
    // const result = await this.props.signup({
    //   variables: {
    //     providerId,
    //     uid
    //   }
    // }).catch(error => console.error(error))

    // const token = result.data.signup.token;
    // firebaseSignIn(token).then(() => {
    //   console.log("login")
    //   this.props.login()
    //   .then(() => {
    //     MainTab();
    //   })
    //   .catch(error => console.error(error));
    // })
  }

  updateFirebase = async (token: string) : Promise<void> => {
    try {
      await firebaseSignIn(token);
      console.log("login")
      LoginMutation(
        {openMainTab: this.openMainTab, updateErrorMessage: this.updateErrorMessage}
      ); 
    } catch(e) {
      console.log(e)
    }
  }

  openMainTab = () : void => {
    MainTab();
  }

  updateErrorMessage = (message: string) : void => {
    console.error("updateErrorMessage", message);
  }

  render() {

    //console.log(this.props.loginStatus.logined);
    return (
      <LoginStatusQuery>
        {({loading, error, logined}) => {
          if (loading) { return <View><Text>loading</Text></View>}
          if (logined) { return this.openMainTab() };
          return(
            <View>
              <TouchableOpacity onPress={this.fbLoginHandler}>
                <Text> Auth Screen</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.fbLoginHandler}>
                <Text> Auth Id</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={this.submitTest}>
                <Text> Test22345</Text>
              </TouchableOpacity> */}
            </View>
          )
        }}
         </LoginStatusQuery>
      
    )
  }
};


export default AuthScreen;
// const mapStateToProps = state => {
//   return {
//     isLoading: true,
//   }
// }
// export default compose(
//   fetchComments,
//   submitComment,
//   // graphql(loginStatusQuery, {name: 'loginStatus'}),
//   signup,
//   login,
//   // graphql(getIdQuery, {
//   //   name: 'getIdQuery',
//   //   options: {
//   //     context: {
//   //       needAuth: true
//   //     },
//   //     fetchPolicy: 'network-only',
//   //   }
//   // }),
// )(AuthScreen);
