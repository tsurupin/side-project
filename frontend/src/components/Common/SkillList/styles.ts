import { StyleSheet } from 'react-native';
import { DETAIL_LABEL_COLOR, ACTIVE_MAIN_COLOR } from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {},
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: DETAIL_LABEL_COLOR,
    marginBottom: 5
  },
  badgeListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },

  badgeContainer: {
    padding: 5,
    height: 30,
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: ACTIVE_MAIN_COLOR
  },
  badgeFirstContainer: {
    padding: 5,
    height: 30,
    marginLeft: 0,
    marginBottom: 10
  },
  badgeText: {
    color: 'white',
    fontSize: 14
  }
});

export default styles;
