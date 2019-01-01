import { StyleSheet } from 'react-native';
import { SUB_TEXT_COLOR, MAIN_TEXT_COLOR, BORDER_COLOR } from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {},
  inputContainer: {},
  buttonFormBox: {},
  textLabel: {},
  itemContainer: {
    height: 48,
    borderColor: BORDER_COLOR
  },
  itemTitle: {
    color: MAIN_TEXT_COLOR,
    fontSize: 16
  },
  rightTitle: {
    color: SUB_TEXT_COLOR,
    fontSize: 16
  }
});

export default styles;
