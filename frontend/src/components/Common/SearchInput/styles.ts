import { StyleSheet } from 'react-native';
import { WHITE_COLOR, SUB_TEXT_COLOR, BACKGROUND_COLOR } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    padding: 10
  },

  leftIconContainer: {
    marginRight: 5
  },
  rightIconContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: WHITE_COLOR,
    borderBottomColor: WHITE_COLOR,

    width: '100%'
  },
  inputTextContainer: {
    fontSize: 16,
    color: SUB_TEXT_COLOR
  }
});

export default styles;
