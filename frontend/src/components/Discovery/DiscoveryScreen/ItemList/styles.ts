import { StyleSheet, Dimensions } from 'react-native';
import { BACKGROUND_COLOR } from '../../../../constants/colors';
const width = Math.trunc(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  blankContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default styles;
