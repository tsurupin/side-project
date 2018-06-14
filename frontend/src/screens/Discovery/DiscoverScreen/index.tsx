import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";

import {
  USER_SEARCH_MODAL_SCREEN,
  PROJECT_SEARCH_MODAL_SCREEN,
  PROJECT_DETAILS_SCREEN,
  USER_DETAILS_SCREEN
} from "../../../constants/screens";
import {
  BACK_BUTTON,
  SUBMIT_BUTTON,
  SEARCH_BUTTON
} from "../../../constants/buttons";
import ItemList from "../../../components/Discovery/DiscoveryScreen/ItemList";
import { UserListQuery } from "../../../queries/users";
import { ProjectListQuery } from "../../../queries/projects";
import {
  UserDetails,
  UserSearchParams,
  ProjectSearchParams
} from "../../../interfaces";
import SegmentedControlTab from "react-native-segmented-control-tab";
import styles from "./styles";

type Props = {
  users: UserDetails[];
  navigator: any;
  client: any;
};

type State = {
  loading: boolean | null;
  users: UserDetails[];
  errorMessage: string;
  userSearchParams: UserSearchParams;
  projectSearchParams: ProjectSearchParams;
  selectedIndex: number;
};

const USER_INDEX = 0;
const PROJECT_INDEX = 1;

class DiscoveryScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: "",
      users: props.users,
      userSearchParams: {
        occupationTypeId: null,
        genreId: null,
        isActive: null,
        distance: null,
        skillIds: []
      },
      projectSearchParams: {
        genreId: null,
        cityId: null,
        skillIds: []
      },
      selectedIndex: USER_INDEX
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
        mainPhotoUrl:
          "https://images.pexels.com/photos/407035/model-face-beautiful-black-and-white-407035.jpeg",
        leadSentence:
          "I'm Ruby and React Software enginner. I like to work on ambiscious project"
      },
      {
        id: 2,
        displayName: "Tomoaki",
        areaName: "San Francisco",
        occupationTypeName: "Software Engineer",
        genreName: "NPO",
        mainPhotoUrl:
          "https://images.pexels.com/photos/407035/model-face-beautiful-black-and-white-407035.jpeg",
        leadSentence:
          "I'm Ruby and React Software enginner. I like to work on ambiscious project"
      }
    ]
  };

  private isUserOriented = (): boolean => {
    return this.state.selectedIndex === USER_INDEX;
  };

  private handleUpdateSearchParams = searchParams => {
    if (this.isUserOriented()) {
      this.setState({ userSearchParams: searchParams });
    } else {
      this.setState({ projectSearchParams: searchParams });
    }
  };

  private handleNavigatorEvent = e => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case SEARCH_BUTTON:
        this.props.navigator.showModal({
          screen: this.isUserOriented()
            ? USER_SEARCH_MODAL_SCREEN
            : PROJECT_SEARCH_MODAL_SCREEN,
          passProps: { onSubmit: this.handleUpdateSearchParams },
          navigatorButtons: {
            leftButtons: [
              {
                //icon: sources[1],
                title: "Back",
                id: BACK_BUTTON
              }
            ],
            rightButtons: [
              {
                title: "Submit",
                id: SUBMIT_BUTTON
              }
            ]
          }
        });
    }
  };

  protected handlePressCard = (id: string) => {
    this.props.navigator.push({
      screen: this.isUserOriented()
        ? USER_DETAILS_SCREEN
        : PROJECT_DETAILS_SCREEN,
      passProps: { id },
      navigatorButtons: {
        leftButtons: [
          {
            //icon: sources[1],
            title: "Back",
            id: BACK_BUTTON
          }
        ]
      }
    });
  };

  private buildUserSearchParams = (): UserSearchParams => {
    const searchParams: UserSearchParams = this.state.userSearchParams;
    return this.cleanupParams(searchParams);
  };

  private buildProjectSearchParams = (): ProjectSearchParams => {
    const searchParams: ProjectSearchParams = this.state.projectSearchParams;
    return this.cleanupParams(searchParams);
  };

  private cleanupParams = (searchParams): any => {
    let conditions = {};
    for (let key in searchParams) {
      if (
        searchParams[key] !== "undefined" &&
        searchParams[key] !== null &&
        searchParams[key].length !== 0
      ) {
        conditions[key] = searchParams[key];
      }
    }
    return conditions;
  };

  private handleIndexChange = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  };

  private renderCards = () => {
    if (this.isUserOriented()) return this.renderUserCards();
    return this.renderProjectCards();
  };

  private renderUserCards = () => {
    const conditions: UserSearchParams = this.buildUserSearchParams();
    return (
      <UserListQuery variables={conditions}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <View>
                <Text>Loading</Text>
              </View>
            );
            //return this.setState({loading})
          }
          if (error) {
            return (
              <View>
                <Text>Error</Text>
              </View>
            );
            //return this.setState({errorMessage: error})
          }
          if (data && data.users) {
            return (
              <ItemList items={data.users} onPressCard={this.handlePressCard} />
            );
          } else {
            return (
              <View>
                <Text>No data</Text>
              </View>
            );
          }
        }}
      </UserListQuery>
    );
  };

  private renderProjectCards = () => {
    const conditions: ProjectSearchParams = this.buildProjectSearchParams();
    return (
      <ProjectListQuery variables={conditions}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <View>
                <Text>Loading</Text>
              </View>
            );
            //return this.setState({loading})
          }
          if (error) {
            return (
              <View>
                <Text>Error</Text>
              </View>
            );
            //return this.setState({errorMessage: error})
          }
          if (data && data.projects) {
            return (
              <ItemList
                items={data.projects}
                onPressCard={this.handlePressCard}
              />
            );
          } else {
            return (
              <View>
                <Text>No data</Text>
              </View>
            );
          }
        }}
      </ProjectListQuery>
    );
  };

  render() {
    //const isVisible = this.props.navigator.screenIsCurrentlyVisible().then(r => console.log("rendered", r))

    console.log("render hoge");

    return (
      <View style={styles.container}>
        <SegmentedControlTab
          values={["Photos", "Details"]}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.renderCards()}
        </ScrollView>
      </View>
    );
  }
}

export default DiscoveryScreen;
