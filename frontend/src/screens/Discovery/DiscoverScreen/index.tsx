import * as React from "react";
import { View, Text, ScrollView } from "react-native";

import {
  USER_SEARCH_MODAL_SCREEN,
  PROJECT_SEARCH_MODAL_SCREEN,
  PROJECT_DETAILS_SCREEN,
  USER_DETAILS_SCREEN
} from "../../../constants/screens";
import { CLOSE_ICON, FILTER_ICON, ARROW_LEFT_ICON } from "../../../constants/icons";

import {
  BACK_BUTTON,
  CLOSE_BUTTON,
  APPLY_BUTTON,
  SEARCH_BUTTON
} from "../../../constants/buttons";
import ItemList from "../../../components/Discovery/DiscoveryScreen/ItemList";
import { UserListQuery } from "../../../queries/users";
import { ProjectListQuery } from "../../../queries/projects";
import {
  UserDetails,
  Skill,
  ProjectDetails,
  UserSearchParams,
  UserSearchSubmitParams,
  ProjectSearchParams,
  ProjectSearchSubmitParams
} from "../../../interfaces";
import {
  ErrorMessage,
  LoadingIndicator,
  CustomizedSegmentedControlTab
} from "../../../components/Common";
import styles from "./styles";
import IconLoader from "../../../utilities/iconLoader";

type Props = {
  navigator: any;
  client: any;
};

type State = {
  loading: boolean;
  errorMessage: string;
  userSearchParams: UserSearchParams;
  projectSearchParams: ProjectSearchParams;
  selectedIndex: number;
};

const USER_INDEX = 0;
const PROJECT_INDEX = 1;
const CONTROL_TABS = ["People", "Projects"];

class DiscoveryScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: "",
      userSearchParams: {
        occupationTypeId: undefined,
        genreId: undefined,
        isActive: undefined,
        location: undefined,
        skills: []
      },
      projectSearchParams: {
        genreId: undefined,
        city: undefined,
        skills: []
      },
      selectedIndex: USER_INDEX
    };

    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private isUserOriented = (): boolean => {
    return this.state.selectedIndex === USER_INDEX;
  };

  private handleUpdateSearchParams = (searchParams) => {
    if (this.isUserOriented()) {
      this.setState({ userSearchParams: searchParams });
    } else {
      this.setState({ projectSearchParams: searchParams });
    }
  };

  private handleNavigatorEvent = (e) => {
    if (e.type !== "NavBarButtonPress") return;

    switch (e.id) {
      case SEARCH_BUTTON:
        this.props.navigator.showModal({
          screen: this.isUserOriented()
            ? USER_SEARCH_MODAL_SCREEN
            : PROJECT_SEARCH_MODAL_SCREEN,
          title: "Filter",
          passProps: { onSubmit: this.handleUpdateSearchParams },
          navigatorButtons: {
            leftButtons: [
              {
                icon: IconLoader.getIcon(CLOSE_ICON),
                title: "Close",
                id: CLOSE_BUTTON
              }
            ],
            rightButtons: [
              {
                icon: IconLoader.getIcon(FILTER_ICON),
                title: "Apply",
                id: APPLY_BUTTON
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
            icon: IconLoader.getIcon(ARROW_LEFT_ICON),
            title: "Back",
            id: BACK_BUTTON
          }
        ]
      }
    });
  };

  private buildUserSearchParams = (): UserSearchSubmitParams => {
    const searchParams: UserSearchParams = this.state.userSearchParams;
    return this.cleanupParams(searchParams);
  };

  private buildProjectSearchParams = (): ProjectSearchSubmitParams => {
    const searchParams: ProjectSearchParams = this.state.projectSearchParams;
    return this.cleanupParams(searchParams);
  };

  private cleanupParams = (searchParams): any => {
    let conditions = {};
    console.log(searchParams);

    for (let key in searchParams) {
      let value = searchParams[key];
      if (Array.isArray(value)) {
        if (value.length === 0) continue;
        if (key === "skills") {
          conditions["skillIds"] = value.map((skill: Skill) => skill.id);
        }
      } else if (key === "location") {
        if (value && value.distance) {
          conditions = { ...conditions, ...value };
        }
      } else if (value !== undefined && value !== null) {
        if (key === "city") {
          if (value.id) {
            conditions["cityId"] = value.id;
          }
        } else {
          conditions[key] = value;
        }
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
    const conditions: UserSearchSubmitParams = this.buildUserSearchParams();
    return (
      <UserListQuery variables={conditions}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingIndicator />;
          }
          if (error) {
            return <ErrorMessage {...error} />;
          }
          if (data && data.users) {
            console.log("users", data.users);
            return (
              <ItemList
                type="User"
                items={data.users}
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
      </UserListQuery>
    );
  };

  private renderProjectCards = () => {
    const conditions: ProjectSearchSubmitParams = this.buildProjectSearchParams();
    return (
      <ProjectListQuery variables={conditions}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingIndicator />;
          
          }
          if (error) {
            return <ErrorMessage {...error} />;
          }
          if (data && data.projects) {
            return (
              <ItemList
                type="Project"
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
    return (
      <View style={styles.container}>
        <CustomizedSegmentedControlTab
          values={CONTROL_TABS}
          borderRadius={0}
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
