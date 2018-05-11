import * as React from 'react';

import { graphql, compose } from 'react-apollo';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import  {
  logout
}  from '../../mutations/accounts';
import { firebaseSignOut } from '../../utilities/firebase';


interface Props {
  logout: () => any;
}

class TopScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  logout = () => {
    firebaseSignOut().then(() => {
      this.props.logout()
      .then(() => console.log('logout succeeded'))
      .catch(error => console.log(error))
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
  logout
)(TopScreen);
