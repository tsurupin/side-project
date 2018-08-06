import * as React from "react";
import { View, Text } from "react-native";
import { ProjectCore } from "../../../interfaces";
import MyProjectList from "./MyProjectList";
import EditableProjectList from "./EditableProjectList";
import {
  LIKED_PROJECT_DETAILS_SCREEN,
  PROJECT_EDIT_SCREEN
} from "../../../constants/screens";
import {
  PROJECT_NEW_BUTTON,
  PROJECT_ACTION_SHEET_BUTTON,
  BACK_BUTTON,
  CLOSE_BUTTON,
  SUBMIT_BUTTON
} from "../../../constants/buttons";
import { CLOSE_ICON } from "../../../constants/icons";
import { getIcon } from "../../../utilities/iconLoader";
import { PROJECT_NEW_SCREEN } from "../../../constants/screens";
import SegmentedControlTab from "react-native-segmented-control-tab";

type Props = {
  navigator: any;
};

type State = {
  selectedIndex: number;
};
const LIKED_PROJECT_INDEX = 0;
const CONTROL_TABS = ["Liked", "Admin"];

class ProjectListScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: LIKED_PROJECT_INDEX
    };
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case PROJECT_NEW_BUTTON:
        this.props.navigator.showModal({
          screen: PROJECT_NEW_SCREEN,
          navigatorButtons: {
            leftButtons: [
              {
                icon: getIcon(CLOSE_ICON),
                title: "Close",
                id: CLOSE_BUTTON
              }
            ],
            rightButtons: [
              {
                title: "Create",
                id: SUBMIT_BUTTON
              }
            ]
          }
        });
    }
  };

  private handleIndexChange = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  };

  private handleLikedProjectPress = (id: string) => {
    this.props.navigator.push({
      screen: LIKED_PROJECT_DETAILS_SCREEN,
      passProps: { id },
      navigatorButtons: {
        leftButtons: [
              {
              
                title: "BACK",
                id: BACK_BUTTON
              }
            ],
            rightButtons: [
              {
                title: "ACTION",
                id: PROJECT_ACTION_SHEET_BUTTON
              }
            ]   
      }});
  };

  private handleEditableProjectPress = (id: string) => {
    this.props.navigator.push({
      screen: PROJECT_EDIT_SCREEN,
      passProps: { id }
    });
  };

  private renderProjectList = () => {
    if (this.state.selectedIndex === 0) {
      return <MyProjectList onPress={this.handleLikedProjectPress} />;
    } else {
      return <EditableProjectList onPress={this.handleEditableProjectPress} />;
    }
  };

  render() {
    return (
      <View>
        <SegmentedControlTab
          values={CONTROL_TABS}
          borderRadius={0}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
        {this.renderProjectList()}
      </View>
    );
  }
}

export default ProjectListScreen;
