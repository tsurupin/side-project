import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR, BORDER_COLOR, MAIN_TEXT_COLOR, LABEL_TEXT_COLOR } from '../../../constants/colors';

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height
  },
  text: {
    width: '80%'
  },
  divider: {},
  icon: {
    width: '20%'
  },
  selectedItemContainer: {
    marginTop: 40,
    marginBottom: 40
  },
  optionsContainer: {
    flexDirection: 'row',
    maxHeight: height,
    justifyContent: 'space-between'
  },
  itemContainer: {
    height: 48,
    borderColor: BORDER_COLOR
  },
  title: {
    color: MAIN_TEXT_COLOR,
    fontSize: 16
  },
  label: {
    color: LABEL_TEXT_COLOR,
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5
  }
});

export default styles;
