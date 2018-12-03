import { StyleSheet } from 'react-native';
import { DetailTextColor, DetailLabelColor } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 24
  },

  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DetailLabelColor,
    marginBottom: 5
  },
  text: {
    color: DetailTextColor,
    fontSize: 16
  }
});

export default styles;
