import * as React from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { View } from "react-native";

type Props = {};

type State = {
  selectedIndex: number;
};

class UserEditControlScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    //this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  handleIndexChange = (selectedIndex: number): void => {
    this.setState({ selectedIndex });
  };

  render() {
    return (
      <View>
        <View>
          <SegmentedControlTab
            values={["Photos", "Details"]}
            selectedIndex={this.state.selectedIndex}
            onTabPress={this.handleIndexChange}
          />
        </View>
      </View>
    );
  }
}

export default UserEditControlScreen;
