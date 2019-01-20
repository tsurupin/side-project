import { StyleSheet } from 'react-native';
import { BORDER_COLOR, MAIN_TEXT_COLOR, SUB_TEXT_COLOR } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderColor: BORDER_COLOR
  },
  title: {
    color: MAIN_TEXT_COLOR,
    fontSize: 16
  },
  rightTitle: {
    color: SUB_TEXT_COLOR,
    width: 200,
    textAlign: 'right',
    fontSize: 16
  }
});

export default styles;
