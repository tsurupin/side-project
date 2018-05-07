import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from 'react-native';

import {
  Header
} from '../../../components/Discovery/DiscoveryScreen';

import {
  FILTER_FORM_SCREEN,
  USER_DETAILS_SCREEN
} from '../../../constants/screens';
import UserList  from '../../../components/Discovery/DiscoveryScreen/UserList';
import { UsersQuery }  from '../../../queries/users';
import styles from './styles';

type User = {
  id: number,
  displayName: string,
  areaName?: string,
  occupationTypeName?: string,
  genreName?: string,
  mainPhotoUrl: string,
  leadSentence?: string
};

type Conditions = {
  occupationTypeId?: number, 
  genreId?: number, 
  isActive?: boolean, 
  distance?: number,
  skillIds?: number[]
}

type Props = {
  fetchUserList: ({variables: any}) => Promise<any>,
  users: User[],
  searchCondistions?: any,
  navigator: any,
  client: any

};

type State = {
  users: User[],
  conditions: Conditions
};

class DiscoveryScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      conditions: {
        occupationTypeId: null,
        genreId: null,
        isActive: null,
        distance: null,
        skillIds: []
      }
    };

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  static defaultProps = {
    users: [
      {
        id: 1,
        displayName: "Tomoaki",
        areaName: "San Francisco",
        occupationTypeName: "Engineer",
        genreName: "Education",
        mainPhotoUrl: "https://images.pexels.com/photos/407035/model-face-beautiful-black-and-white-407035.jpeg",
        leadSentence: "I'm Ruby and React Software enginner. I like to work on ambiscious project"
      },
      {
        id: 2,
        displayName: "Tomoaki",
        areaName: "San Francisco",
        occupationTypeName: "Software Engineer",
        genreName: "NPO",
        mainPhotoUrl: "https://images.pexels.com/photos/407035/model-face-beautiful-black-and-white-407035.jpeg",
        leadSentence: "I'm Ruby and React Software enginner. I like to work on ambiscious project"
      }
    ],
    searchConditions: {}
  }

  componentWillMount() {
    console.log('hohoh')
  }

  componentWillReceiveProps(newProps) {
    console.log("will receive ")
  }

  updateFilterConditions = (conditions: Conditions) => {
    this.setState({conditions});
  }

  onNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') { return;}
    switch (e.id) {
      case "FilterButton":
        this.props.navigator.showModal({
          screen: FILTER_FORM_SCREEN,
          passProps: {updateFilterConditions: this.updateFilterConditions},
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

  onPressUserCard = (user: User) => {
    this.props.navigator.push({
      screen: USER_DETAILS_SCREEN,
      passProps: {user: user}
    })
  }


  renderUserCards = () => {
    let conditions = {};
    for (let key in this.state.conditions) {
      if (this.state.conditions[key] !== 'undefined' && this.state.conditions[key] !== null && this.state.conditions[key].length !== 0) {
        conditions[key] = this.state.conditions[key];
      }
    }
    return UsersQuery(conditions, {onPressUserCard: this.onPressUserCard}, UserList);
  }

  render() {
    console.log("render hoge")
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
