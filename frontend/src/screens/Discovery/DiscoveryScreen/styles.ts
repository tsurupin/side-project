import { StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  cardListContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row'
  }
});

export default styles;
