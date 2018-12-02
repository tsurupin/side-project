import { StyleSheet, Dimensions } from 'react-native';
import { BackgroundColor } from '../../../constants/colors';

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    height,
    paddingTop: 30,
    paddingBottom: 30,
  },
});

export default styles;
