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
  USER_SEARCH_MODAL_SCREEN,
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
  searchParams: UserSearchParams
};

class DiscoveryScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: '',
      users: props.users,
      searchParams: {
        occupationTypeId: null,
        genreId: null,
        isActive: null,
        distance: null,
        skillIds: []
      }
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
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
    searchParams: {}
  }

  componentWillMount() {
    console.log('hohoh')
  }

  componentWillReceiveProps(newProps) {
    console.log("will receive ")
  }

  protected handleUpdateSearchParams = (searchParams: UserSearchParams) => {
    this.setState({searchParams});
  }

  protected handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') { return;}
    switch (e.id) {
      case "FilterButton":
        this.props.navigator.showModal({
          screen: USER_SEARCH_MODAL_SCREEN,
          passProps: {onSubmit: this.handleUpdateSearchParams},
          navigatorButtons: {
            leftButtons: [
              {
                //icon: sources[1],
                title: "Back",
                id: "CancelUserSearchButton"
              }
            ],
            rightButtons: [
              {
                title: "Submit",
                id: "SubmitUserSearchButton"
              }

            ]
          }
         
        })
    }
  }

  protected handlePressUserCard = (id: number) => {
    console.log("handlePressUser")
    this.props.navigator.push({
      screen: USER_DETAILS_SCREEN,
      passProps: {id}
    })
  }

  private buildSearchParams = () : UserSearchParams => {
    let conditions = {};
    for (let key in this.state.searchParams) {
      if (this.state.searchParams[key] !== 'undefined' && this.state.searchParams[key] !== null && this.state.searchParams[key].length !== 0) {
        conditions[key] = this.state.searchParams[key];
      }
    }
    return conditions
  }


  private renderUserCards = () => {
    const conditions = this.buildSearchParams();
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
            return <UserList users={data.users} onPressUserCard={this.handlePressUserCard} />
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
