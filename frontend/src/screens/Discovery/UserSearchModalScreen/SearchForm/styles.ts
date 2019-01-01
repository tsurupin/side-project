import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR } from '../../../../constants/colors';
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height,
    paddingTop: 40
  }
});

export default styles;
