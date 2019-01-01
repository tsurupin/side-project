import { StyleSheet } from 'react-native';
import { BORDER_COLOR, LABEL_TEXT_COLOR } from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {},
  label: {
    color: LABEL_TEXT_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5
  },
  itemContainer: {
    height: 80,
    borderColor: BORDER_COLOR
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default styles;
