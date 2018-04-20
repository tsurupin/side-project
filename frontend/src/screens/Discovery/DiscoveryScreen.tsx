import * as React from 'react';

import { graphql, compose } from 'react-apollo';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import {
  fetchUserList
} from '../../queries/users';

type Props = {
  fetchUserList: ({variables: any}) => Promise<any> 

};

type State = {

};

class DiscoveryScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    return (
      <View></View>
    )

  }

};

export default compose(
  fetchUserList
)(DiscoveryScreen);