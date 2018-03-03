import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
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
import { addCommentSubscription } from '../../graphql/subscriptions';
import { firebaseSignIn } from '../../utilities/firebase';
import startMainTab  from '../MainTabs/StartMainTab';
// import { singUp } from '../../store/actions/accounts';
const FACEBOOK = 'facebook';

class AuthScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
    this.props.submit().then(re => console.log(re)).catch(e => console.log(e));
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
          <Text> Test</Text>
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


const COMMENT_QUERY = gql`
  query comments($repoName: String!) {
    comments(repoName: $repoName) {
      id
      content
    }
  }
`;
const COMMENT_SUBSCRIPTION = gql`
    subscription commentAdded($repoName: String!){
       commentAdded(repoName: $repoName){
        id
        content
      }
    }
`;

const SUMBMIT_COMMENT = gql`
    mutation submitComment($repoName: String!){
       submitComment(repoName: $repoName){
        id
        content
      }
    }
`;


export default compose(
  graphql(COMMENT_QUERY, {
    name: 'comments',
    options: props => ({
        variables: {
          repoName: 'test'
        },
        context: {
          needAuth: false
        },
    }),
    props: props => {
        return {
           ...props,
            subscribeToNewComments: params => {
                return props.comments.subscribeToMore({
                    document: COMMENT_SUBSCRIPTION,
                    variables: {
                        repoName: 'test',
                    },
                    updateQuery: (prev, {subscriptionData}) => {
                        console.log(prev);
                        console.log(subscriptionData);
                        if (!subscriptionData.data) {
                            return prev;
                        }

                        const newFeedItem = subscriptionData.data.commentAdded;

                        return Object.assign({}, prev, {
                            comments: [newFeedItem, ...prev.comments]
                        });
                    }
                });
            }
        };
    }
  }),
  // graphql(loginStatusQuery, {name: 'loginStatus'}),
  graphql(signUpMutation, {
    name: 'signUp',
    options: props => ({
      variables: {
        providerId: props.providerId,
        uid: props.uid,
      }
    })
  }),
  graphql(SUMBMIT_COMMENT, {
    name: 'submit',
    options: props => ({
      variables: {
        repoName: 'test'
      }
    })
  }),
  graphql(loginMutation, {
    name: 'login',
    options: { variables: { logined: true }}
  }),
  // graphql(getIdQuery, {
  //   name: 'getIdQuery',
  //   options: {
  //     context: {
  //       needAuth: true
  //     },
  //     fetchPolicy: 'network-only',
  //   }
  // }),
  connect(mapStateToProps)
)(AuthScreen);
