import { StyleSheet } from 'react-native';
import { BackgroundColor, SubTextColor, WhiteColor } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    padding: 10,
  },

  leftIconContainer: {
    marginRight: 5,

  },
  rightIconContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: WhiteColor,
    borderBottomColor: WhiteColor,

    width: '100%',
  },
  inputTextContainer: {
    fontSize: 16,
    color: SubTextColor,

  },
});

export default styles;
