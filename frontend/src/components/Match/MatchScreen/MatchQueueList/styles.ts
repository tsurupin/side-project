import { StyleSheet } from 'react-native';
import { LABEL_TEXT_COLOR, BORDER_COLOR, WHITE_COLOR } from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 30
  },
  label: {
    color: LABEL_TEXT_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5
  },
  listContainer: {
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    padding: 10,
    backgroundColor: WHITE_COLOR
  },

  avatar: {}
});

export default styles;
