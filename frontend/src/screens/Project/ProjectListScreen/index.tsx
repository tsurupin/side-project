import * as React from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MyProjectList from './MyProjectList';
import EditableProjectList from './EditableProjectList';
import { LIKED_PROJECT_DETAILS_SCREEN, PROJECT_EDIT_SCREEN, PROJECT_NEW_SCREEN } from '../../../constants/screens';
import {
  PROJECT_NEW_BUTTON,
  PROJECT_ACTION_SHEET_BUTTON,
  BACK_BUTTON,
  CLOSE_BUTTON,
  SUBMIT_BUTTON
} from '../../../constants/buttons';
import { CLOSE_ICON, BACK_ICON } from '../../../constants/icons';
import IconLoader from '../../../utilities/IconLoader';
import { CustomizedSegmentedControlTab } from '../../../components/Common';
import styles from './styles';
import {
  buildDefaultNavigationStack,
  buildDefaultNavigationComponent
} from '../../../utilities/navigationStackBuilder';

type Props = {
  navigator: any;
  componentId: string;
};

type State = {
  selectedIndex: number;
};
const LIKED_PROJECT_INDEX = 0;
const CONTROL_TABS = ['Liked', 'Admin'];

class ProjectListScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: LIKED_PROJECT_INDEX
    };
    Navigation.events().bindComponent(this);
  }

  private navigationButtonPressed = ({ buttonId }: { buttonId: string }) => {
    switch (buttonId) {
      case PROJECT_NEW_BUTTON:
        Navigation.showModal(
          buildDefaultNavigationStack({
            screenName: PROJECT_NEW_SCREEN,
            props: {},
            leftButton: {
              icon: IconLoader.getIcon(CLOSE_ICON),
              id: CLOSE_BUTTON
            },
            rightButton: {
              text: 'Create',
              enabled: true,
              id: SUBMIT_BUTTON
            }
          })
        );
    }
  };

  private handleIndexChange = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  };

  private handleLikedProjectPress = (id: string, title: string) => {
    Navigation.push(
      this.props.componentId,
      buildDefaultNavigationComponent({
        screenName: LIKED_PROJECT_DETAILS_SCREEN,
        props: {
          id
        },
        title,
        leftButton: {
          icon: IconLoader.getIcon(BACK_ICON),
          id: BACK_BUTTON
        },
        rightButton: {
          id: PROJECT_ACTION_SHEET_BUTTON,
          text: 'Leave',
          enabled: true
        }
      })
    );
  };

  private handleEditableProjectPress = (id: string) => {
    Navigation.showModal(
      buildDefaultNavigationStack({
        screenName: PROJECT_EDIT_SCREEN,
        props: { id },
        leftButton: {
          icon: IconLoader.getIcon(CLOSE_ICON),
          id: CLOSE_BUTTON
        },
        rightButton: {
          text: 'Change',
          enabled: true,
          id: SUBMIT_BUTTON
        }
      })
    );
  };

  private renderProjectList = () => {
    if (this.state.selectedIndex === LIKED_PROJECT_INDEX) {
      return <MyProjectList onPress={this.handleLikedProjectPress} />;
    }
    return <EditableProjectList onPress={this.handleEditableProjectPress} />;
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
        <View style={styles.listContainer}>{this.renderProjectList()}</View>
      </View>
    );
  }
}

export default ProjectListScreen;
