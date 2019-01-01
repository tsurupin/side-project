import { StyleSheet } from 'react-native';
import { SUB_TEXT_COLOR, BORDER_COLOR, WHITE_COLOR, LABEL_TEXT_COLOR } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20
  },
  label: {
    color: LABEL_TEXT_COLOR,
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5
  },
  itemContainer: {
    height: 48,
    borderColor: BORDER_COLOR,
    backgroundColor: WHITE_COLOR
  },
  placeholder: {},
  title: {
    color: SUB_TEXT_COLOR,
    fontSize: 16
  }
});

export default styles;
