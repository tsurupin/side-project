import { Dimensions, StyleSheet } from 'react-native';
import { BackgroundColor } from '../../../constants/colors';
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  listContainer: {
    height: height - 40,
    backgroundColor: BackgroundColor,
  },
});

export default styles;
