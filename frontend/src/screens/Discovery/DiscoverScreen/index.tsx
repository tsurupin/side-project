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
  USER_FILTER_CONDITION_CLIENT_QUERY
} from '../../../graphql/users';

import {
  fetchUserList
} from '../../../queries/users';

import {
  FILTER_FORM_SCREEN
} from '../../../constants/screens';
import styles from './styles';

type User = {
  id: number,
  displayName: string,
  areaName?: string,
  genreName?: string,
  mainPhotoUrl: string,
  leadSentence?: string
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
  searchCondistions?: any,
  navigator: any

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
    console.log(this.props)

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  static defaultProps = {
    users: [
      {
        id: 1,
        displayName: "Tomoaki",
        areaName: "San Francisco",
        genreName: "Engineer",
        mainPhotoUrl: "https://images.pexels.com/photos/407035/model-face-beautiful-black-and-white-407035.jpeg",
        leadSentence: "I'm Ruby and React Software enginner. I like to work on ambiscious project"
      },
      {
        id: 2,
        displayName: "Tomoaki",
        areaName: "San Francisco",
        genreName: "Software Engineer",
        mainPhotoUrl: "https://images.pexels.com/photos/407035/model-face-beautiful-black-and-white-407035.jpeg",
        leadSentence: "I'm Ruby and React Software enginner. I like to work on ambiscious project"
      }
    ],
    searchConditions: {}
  }

  componentWillMount() {
    console.log('hohoh')

    // this.props.fetchUserList({
    //   variables: this.searchConditions()
    // }).then (users => {
    //   this.setState({users});
    // })

  }

  onNavigatorEvent = (e) => {
    console.log(e, e.event, e.id)
    if (e.type !== 'NavBarButtonPress') { return;}
    switch (e.id) {
      case "FilterButton":
        this.props.navigator.showModal({
          screen: FILTER_FORM_SCREEN,
          navigatorButtons: {
            leftButtons: [
              {
                //icon: sources[1],
                title: "Back",
                id: "CancelFilterButton"
              }
            ],
            rightButtons: [
              {
                title: "Submit",
                id: "SubmitFilterButton"
              }

            ]
          }
         
        })
    }
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
        <View key={0}>
          <Text>No Users Found</Text>
        </View>
      )
    }
    return (
      <View style={styles.cardListContainer}>
        {this.state.users.map(user => {
          return this.renderUserCard(user)
        })}
      </View>
    );
  }

  renderUserCard = (user) => {
    return <UserCard key={user.id} user={user} />
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          >
          {this.renderUserCards()}
        </ScrollView>
      </View>
    )
  }
};

export default DiscoveryScreen;
