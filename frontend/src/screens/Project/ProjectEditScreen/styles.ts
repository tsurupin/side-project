import { Dimensions, StyleSheet } from 'react-native';
import { BackgroundColor } from '../../../constants/colors';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    height,
  },
  avatarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '100%',
  },
});
export default styles;
