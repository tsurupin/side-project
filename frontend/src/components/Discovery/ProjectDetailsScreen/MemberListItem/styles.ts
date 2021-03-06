import { StyleSheet } from 'react-native';
import { SUB_TEXT_COLOR } from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginBottom: 10
  },
  contentContainer: {
    height: '100%'
  },
  title: {
    color: SUB_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  subTitle: {
    fontSize: 16
  }
});
export default styles;
