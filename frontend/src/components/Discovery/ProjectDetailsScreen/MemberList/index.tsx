import * as React from 'react';

import { Animated, FlatList, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ActiveMainColor } from '../../../../constants/colors';
import {
  FORMAT_HORIZONTAL_ALIGN_LEFT_ICON,
  FORMAT_HORIZONTAL_ALIGN_RIGHT_ICON,
  ICON_MAIN_TYPE,
} from '../../../../constants/icons';
import { UserCore } from '../../../../interfaces';
import MemberListItem from '../MemberListItem';
import styles from './styles';

interface Props {
  members: UserCore[];
  onPressUser: (userId: string) => void;
}

interface State {
  isOpen: boolean;
  currentHeight?: any;
  maxHeight: number;
}
const MIN_HEIGHT = 2;

class MemberList extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      maxHeight:  MIN_HEIGHT + (props.members.length * 60) - 10,
      currentHeight: new Animated.Value(2),
    };
  }

  public render() {
    const { members, onPressUser } = this.props;

    return (
      <View>
        <View  style={styles.header}>
            <Text style={styles.label}>{`Members (${members.length})`}</Text>
            {this.renderUserListToggleIcon()}
        </View>
      <Animated.View
        style={[styles.container, { height: this.state.currentHeight }]}
      >
        <FlatList
          data={members}
          renderItem={({ item }) => {
            return <MemberListItem member={item} onPress={onPressUser} />;
          }}
        />
      </Animated.View>
      </View>
    );
  }

  private toggle = () => {
    const { isOpen, maxHeight } = this.state;

    const finalValue = isOpen ? MIN_HEIGHT : maxHeight;

    this.setState({ isOpen: !this.state.isOpen });

    Animated.spring(this.state.currentHeight, {
      toValue: finalValue,
    }).start();
  }

  private renderUserListToggleIcon = () => {
    return (

      <Icon
        size={20}
        color={ActiveMainColor}
        containerStyle={styles.iconContainer}
        type={ICON_MAIN_TYPE}
        name={
          this.state.isOpen
            ? FORMAT_HORIZONTAL_ALIGN_LEFT_ICON
            : FORMAT_HORIZONTAL_ALIGN_RIGHT_ICON
        }
        onPress={() => this.toggle()}
      />
    );
  }
}

export default MemberList;
