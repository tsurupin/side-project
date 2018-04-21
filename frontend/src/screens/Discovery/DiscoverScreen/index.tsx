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
} from '../../../components/Discovery/DiscoveryScreen';


import {
  fetchUserList
} from '../../../queries/users';

import styles from './styles';

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
  searchCondistions?: any

};

type State = {
  users: User[]
  
};

class DiscoveryScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users
    };
  }

  static defaultProps = {
    users: [],
    searchConditions: {}
  }

  componentWillMount() {

    // this.props.fetchUserList({
    //   variables: this.searchConditions()
    // }).then (users => {
    //   this.setState({users});
    // })

  }

  searchConditions = () => {
    console.log(this.props);
    const { occupationTypeId, genreId, isActive, skillIds } = this.props.searchCondistions;
    return {
      occupationTypeId, 
      genreId, 
      isActive, 
      skillIds
    };
  }

  renderUserCards = () => {
    console.log(this.state)
    
    if (this.state.users.length == 0) {
      return (
        <View>
          <Text>No Users Found</Text>
        </View>
      )
    }
    return (
      <View style={styles.cardListContainer}>
        {this.state.users.map(user => {
          this.renderUserCard(user)
        })}
      </View>
    );
  }

  renderUserCard = (user) => {
    return <UserCard user={user} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
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

