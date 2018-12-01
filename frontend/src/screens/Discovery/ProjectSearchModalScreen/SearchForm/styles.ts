import { Dimensions, StyleSheet } from 'react-native';
import { BackgroundColor } from '../../../../constants/colors';
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    height,
    paddingTop: 40,
  },
});

export default styles;
