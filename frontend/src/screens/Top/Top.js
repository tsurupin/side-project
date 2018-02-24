import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { firebaseSignOut } from '../../utilities/firebase';

class TopScreen extends Component {
  constructor(props) {
    super(props);
  }
  logout = () => {
    firebaseSignOut();
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.logput}>
          <Text> Top Screen</Text>
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

export default connect(mapStateToProps)(TopScreen);
