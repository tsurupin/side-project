import * as React from 'react';
import { Text, View } from 'react-native';
import { CustomizedSegmentedControlTab } from '../../../components/Common';
import {
  BACK_BUTTON,
  CLOSE_BUTTON,
  PROJECT_ACTION_SHEET_BUTTON,
  PROJECT_NEW_BUTTON,
  SUBMIT_BUTTON,
} from '../../../constants/buttons';
import { BACK_ICON, CLOSE_ICON } from '../../../constants/icons';
import {
  LIKED_PROJECT_DETAILS_SCREEN,
  PROJECT_EDIT_SCREEN,
} from '../../../constants/screens';
import { PROJECT_NEW_SCREEN } from '../../../constants/screens';
import iconLoader from '../../../utilities/iconLoader';
import EditableProjectList from './EditableProjectList';
import MyProjectList from './MyProjectList';
import styles from './styles';

interface Props {
  navigator: any;
}

interface State {
  selectedIndex: number;
}
const LIKED_PROJECT_INDEX = 0;
const CONTROL_TABS = ['Liked', 'Admin'];

class ProjectListScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: LIKED_PROJECT_INDEX,
    };
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  public render() {
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

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') { return; }

    switch (e.id) {
      case PROJECT_NEW_BUTTON:
        this.props.navigator.showModal({
          screen: PROJECT_NEW_SCREEN,
          navigatorButtons: {
            leftButtons: [
              {
                icon: IconLoader.getIcon(CLOSE_ICON),
                id: CLOSE_BUTTON,
              },
            ],
            rightButtons: [
              {
                title: 'Create',
                id: SUBMIT_BUTTON,
              },
            ],
          },
        });
    }
  }

  private handleIndexChange = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  }

  private handleLikedProjectPress = (id: string) => {
    this.props.navigator.push({
      screen: LIKED_PROJECT_DETAILS_SCREEN,
      passProps: { id },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(BACK_ICON),
            id: BACK_BUTTON,
          },
        ],
        rightButtons: [
          {
            title: 'ACTION',
            id: PROJECT_ACTION_SHEET_BUTTON,
          },
        ],
      },
    });
  }

  private handleEditableProjectPress = (id: string) => {
    this.props.navigator.showModal({
      screen: PROJECT_EDIT_SCREEN,
      passProps: { id },
      navigatorButtons: {
        leftButtons: [
          {
            icon: IconLoader.getIcon(CLOSE_ICON),
            id: CLOSE_BUTTON,
          },
        ],
        rightButtons: [
          {
            title: 'Submit',
            id: SUBMIT_BUTTON,
          },
        ],
      },
    });
  }

  private renderProjectList = () => {
    if (this.state.selectedIndex === 0) {
      return <MyProjectList onPress={this.handleLikedProjectPress} />;
    } else {
      return <EditableProjectList onPress={this.handleEditableProjectPress} />;
    }
  }
}

export default ProjectListScreen;
