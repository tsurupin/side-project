import * as React from 'react';

import { graphql, compose } from 'react-apollo';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from 'react-native';

import {
  UserCard,
  Header
} from '../../components/Discovery';
import styles from './styles';

import {
  fetchUserList
} from '../../queries/users';

type User = {

};

type SearchConditions = {
  occupationTypeId?: number, 
  genreId?: number, 
  isActive?: boolean, 
  skillIds?: number[]
}

type Props = {
  fetchUserList: ({variables: any}) => Promise<any>,
  users: User[],
  navigation: {
    state?: SearchConditions
  }

};

type State = {
  users: User[]
  
};

class DiscoveryScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

    this.props.fetchUserList({
      variables: this.searchConditions()
    }).then (users => {
      this.setState({users});
    })

  }

  searchConditions = () => {
    const {state}  = this.props.navigation;
    const { occupationTypeId, genreId, isActive, skillIds } = state;
    return {
      occupationTypeId, 
      genreId, 
      isActive, 
      skillIds
    };
  }

  renderUserCards = () => {
    if (this.state.users.length == 0) {
      return (
        <View>No Users Found</View>
      )
    }
    return (
      {this.state.users.map(user => {
      return <UserCard user={user} />
    })})
  }

  


  render() {
    return (
      <View style={styles.container}>
        <Header searchCondition={this.props.navigation.state}/>
        <ScrollView>
          {this.renderUserCards()}
        </ScrollView>
      </View>
    )
  }
};

export default compose(
  fetchUserList
)(DiscoveryScreen);

