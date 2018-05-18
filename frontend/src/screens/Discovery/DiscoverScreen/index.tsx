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
import { UserListQuery }  from '../../../queries/users';
import styles from './styles';
import { 
  UserDetails,
  UserSearchParams 
} from '../../../interfaces';

type Props = {
  fetchUserList: ({variables: any}) => Promise<any>,
  users: UserDetails[],
  searchCondistions?: any,
  navigator: any,
  client: any
};

type State = {
  loading: boolean | null, 
  users: UserDetails[],
  errorMessage: string
  conditions: UserSearchParams
};

class DiscoveryScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: '',
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

  updateFilterConditions = (conditions: UserSearchParams) => {
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

  onPressUserCard = (user: UserDetails) => {
    this.props.navigator.push({
      screen: USER_DETAILS_SCREEN,
      passProps: {id: user.id}
    })
  }

  buildConditions = () : UserSearchParams => {
    let conditions = {};
    for (let key in this.state.conditions) {
      if (this.state.conditions[key] !== 'undefined' && this.state.conditions[key] !== null && this.state.conditions[key].length !== 0) {
        conditions[key] = this.state.conditions[key];
      }
    }
    return conditions
  }


  renderUserCards = () => {
    const conditions = this.buildConditions();
    return(
      <UserListQuery variables={conditions}>
        {({loading, error, data}) => {
          console.log("UserListQuery", loading, error, data)
          if (loading) { 
            return <View><Text>Loading</Text></View>;
            //return this.setState({loading}) 
          }
          if (error) { 
            return <View><Text>Error</Text></View>;
            //return this.setState({errorMessage: error}) 
          }
          if (data && data.users) {
            return <UserList users={data.users} onPressUserCard={this.onPressUserCard} />
          } else {
            return <View><Text>No data</Text></View>
          }
          
        }}
      </UserListQuery>
    )

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
