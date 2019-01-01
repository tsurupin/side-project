import { StyleSheet } from 'react-native';
import { MAIN_TEXT_COLOR, SUB_TEXT_COLOR } from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%'
  },
  avatar: {},
  mainText: {
    marginTop: 10,
    color: MAIN_TEXT_COLOR,
    fontWeight: 'bold',
    fontSize: 20
  },
  subText: {
    marginTop: 5,
    color: SUB_TEXT_COLOR,
    fontSize: 14
  }
});

export default styles;
