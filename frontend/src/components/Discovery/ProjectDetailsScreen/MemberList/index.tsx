import * as React from 'react';

import { Animated, View, Text, FlatList } from 'react-native';
import { UserCore } from '../../../../interfaces';
import MemberListItem from '../MemberListItem';
import { Icon } from 'react-native-elements';
import {
  FORMAT_HORIZONTAL_ALIGN_LEFT_ICON,
  FORMAT_HORIZONTAL_ALIGN_RIGHT_ICON,
  ICON_MAIN_TYPE
} from '../../../../constants/icons';
import { ACTIVE_MAIN_COLOR } from '../../../../constants/colors';
import styles from './styles';

type Props = {
  members: UserCore[];
  onPressUser: (userId: string) => void;
};

const MIN_HEIGHT = 2;
const initialState = {
  isOpen: false,
  maxHeight: MIN_HEIGHT,
  currentHeight: new Animated.Value(2)
};

type State = Readonly<typeof initialState>;

class MemberList extends React.Component<Props, State> {
  readonly state: State = initialState;

  constructor(props: Props) {
    super(props);

    this.setState({ maxHeight: MIN_HEIGHT + props.members.length * 60 - 10 });
  }

  private toggle = () => {
    const { isOpen, maxHeight } = this.state;

    const finalValue = isOpen ? MIN_HEIGHT : maxHeight;

    this.setState({ isOpen: !this.state.isOpen });

    Animated.spring(this.state.currentHeight, {
      toValue: finalValue
    }).start();
  };

  private renderUserListToggleIcon = () => {
    return (
      <Icon
        size={20}
        color={ACTIVE_MAIN_COLOR}
        containerStyle={styles.iconContainer}
        type={ICON_MAIN_TYPE}
        name={this.state.isOpen ? FORMAT_HORIZONTAL_ALIGN_LEFT_ICON : FORMAT_HORIZONTAL_ALIGN_RIGHT_ICON}
        onPress={() => this.toggle()}
      />
    );
  };

  render() {
    const { members, onPressUser } = this.props;

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.label}>{`Members (${members.length})`}</Text>
          {this.renderUserListToggleIcon()}
        </View>
        <Animated.View style={[styles.container, { height: this.state.currentHeight }]}>
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
}

export default MemberList;
