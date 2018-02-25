import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { logoutMutation } from '../../graphql/mutations';
import { firebaseSignOut } from '../../utilities/firebase';

class TopScreen extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    firebaseSignOut().then(() => {
      this.logout()
    })
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.logout}>
          <Text> Top Screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
};


export default compose(
  graphql(logoutMutation, {
    name: 'logout',
    options: props => ({
      variables: {
        logined: false
      }
    })
  })
)(TopScreen);
