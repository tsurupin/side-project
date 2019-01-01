import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR } from '../../../constants/colors';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  listContainer: {
    height: height - 40,
    backgroundColor: BACKGROUND_COLOR
  }
});

export default styles;
