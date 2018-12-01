import { Dimensions, StyleSheet } from 'react-native';
import { BackgroundColor, BorderColor, MainTextColor, SubTextColor } from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
  },
  inputContainer: {},
  buttonFormBox: {},
  textLabel: {},
  itemContainer: {
    height: 48,
    borderColor: BorderColor,
  },
  itemTitle: {
    color: MainTextColor,
    fontSize: 16,
  },
  rightTitle: {
    color: SubTextColor,
    fontSize: 16,
  },
});

export default styles;
