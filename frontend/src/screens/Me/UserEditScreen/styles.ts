import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR } from '../../../constants/colors';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    height
  },
  avatarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '100%'
  }
});
export default styles;
