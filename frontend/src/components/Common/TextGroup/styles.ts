import { StyleSheet } from 'react-native';
import { DETAIL_LABEL_COLOR, DETAIL_TEXT_COLOR } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 24
  },

  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DETAIL_LABEL_COLOR,
    marginBottom: 5
  },
  text: {
    color: DETAIL_TEXT_COLOR,
    fontSize: 16
  }
});

export default styles;
