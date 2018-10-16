import * as React from "react";
import { View, Text } from "react-native";
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
import { CLOSE_ICON, ARROW_LEFT_ICON } from "../../../constants/icons";
import IconLoader from "../../../utilities/iconLoader";
import { PROJECT_NEW_SCREEN } from "../../../constants/screens";
import { CustomizedSegmentedControlTab } from "../../../components/Common";
import styles from "./styles";

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

    switch (e.id) {
      case PROJECT_NEW_BUTTON:
        this.props.navigator.showModal({
          screen: PROJECT_NEW_SCREEN,
          navigatorButtons: {
            leftButtons: [
              {
                icon: IconLoader.getIcon(CLOSE_ICON),
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
            icon: IconLoader.getIcon(ARROW_LEFT_ICON),
            id: BACK_BUTTON
          }
        ],
        rightButtons: [
          {
            title: "ACTION",
            id: PROJECT_ACTION_SHEET_BUTTON
          }
        ]
      }
    });
  };

  private handleEditableProjectPress = (id: string) => {
    this.props.navigator.push({
      screen: PROJECT_EDIT_SCREEN,
      passProps: { id },
      navigatorButtons: {
        rightButtons: [
          {
            title: "Submit",
            id: SUBMIT_BUTTON
          }
        ]
      }
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
        <CustomizedSegmentedControlTab
          values={CONTROL_TABS}
          borderRadius={0}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
        />
        <View style={styles.listContainer}>
        {this.renderProjectList()}
        </View>
      </View>
    );
  }
}

export default ProjectListScreen;
