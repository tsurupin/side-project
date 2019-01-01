import { StyleSheet } from 'react-native';
import { SEGMENT_CONTROL_COLOR, WHITE_COLOR, SEGMENT_CONTROL_ACTIVE_COLOR } from '../../../constants/colors';

const styles = StyleSheet.create({
  tabContainerStyle: {},
  tabStyle: {
    height: 40,
    backgroundColor: WHITE_COLOR,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRightColor: WHITE_COLOR,
    borderBottomColor: SEGMENT_CONTROL_COLOR
  },
  tabTextStyle: {
    color: SEGMENT_CONTROL_COLOR
  },
  activeTabStyle: {
    height: 40,
    backgroundColor: WHITE_COLOR,
    borderBottomWidth: 4,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRightColor: WHITE_COLOR,
    borderBottomColor: SEGMENT_CONTROL_ACTIVE_COLOR
  },
  activeTabTextStyle: {
    color: SEGMENT_CONTROL_ACTIVE_COLOR
  }
});

export default styles;
