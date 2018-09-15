import * as React from "react";

import { Animated, View, Text, FlatList } from "react-native";
import { UserCore } from "../../../../interfaces";
import MemberListItem from "../MemberListItem";
import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import {
  FORMAT_HORIZONTAL_ALIGN_LEFT_ICON,
  FORMAT_HORIZONTAL_ALIGN_RIGHT_ICON
} from "../../../../constants/icons";
import styles from "./styles";

type Props = {
  members: UserCore[];
  onPressUser: (userId: string) => void;
};

type State = {
  isOpen: boolean;
  currentHeight?: any;
  minHeight: number;
  maxHeight: number;
};
class MemberList extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      minHeight: 0,
      maxHeight: 0
    };
  }

  private toggle = () => {
    const { isOpen, minHeight, maxHeight } = this.state;

    const initialValue = isOpen ? maxHeight + minHeight : minHeight;
    const finalValue = isOpen ? minHeight : maxHeight + minHeight;

    this.setState({ isOpen: !this.state.isOpen });
    this.state.currentHeight.setValue(initialValue);
    Animated.spring(this.state.currentHeight, {
      toValue: finalValue
    }).start();
  };

  private setMaxHeight = (event) => {
    this.setState({
      maxHeight: event.nativeEvent.layout.height
    });
  };

  private setMinHeight = (event) => {
    const height = event.nativeEvent.layout.height;
    this.setState({
      minHeight: height,
      currentHeight: new Animated.Value(height)
    });
  };

  private renderUserListToggleIcon = () => {
    return (
      <Icon
        size={20}
        color="blue"
        iconStyle={styles.iconContainer}
        name={
          this.state.isOpen
            ? FORMAT_HORIZONTAL_ALIGN_LEFT_ICON
            : FORMAT_HORIZONTAL_ALIGN_RIGHT_ICON
        }
        onPress={() => this.toggle()}
      />
    );
  };

  render() {
    const { members, onPressUser } = this.props;

    return (
      <Animated.View
        style={[styles.container, { height: this.state.currentHeight }]}
      >
        <View style={styles.header} onLayout={this.setMinHeight}>
          <Text style={styles.label}>{`Members (${members.length})`}</Text>
          {this.renderUserListToggleIcon()}
        </View>
        <View onLayout={this.setMaxHeight}>
          <FlatList
            data={members}
            renderItem={({ item }) => {
              return <MemberListItem member={item} onPress={onPressUser} />;
            }}
          />
        </View>
      </Animated.View>
    );
  }
}

export default MemberList;
