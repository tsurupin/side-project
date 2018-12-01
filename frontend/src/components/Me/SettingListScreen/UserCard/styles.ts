import { StyleSheet } from 'react-native';
import { MainTextColor, SubTextColor } from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%',
  },
  avatar: {

  },
  mainText: {
    marginTop: 10,
    color: MainTextColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
  subText: {
    marginTop: 5,
    color: SubTextColor,
    fontSize: 14,
  },
});

export default styles;
