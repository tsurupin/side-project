import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tryAuth } from "../../store/actions/index"

import {
  View, Text
} from 'react-native';

class AuthScreen extends Component {

  render() {
    this.props.onLogin();
    console.log(this.props.isLoading);
    return (
      <View>
        <Text> Auth Screen</Text>
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
