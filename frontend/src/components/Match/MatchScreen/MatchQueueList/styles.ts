import { StyleSheet, Dimensions } from 'react-native';
import { BorderColor, LabelTextColor, WhiteColor } from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,

  },
  label: {
    color: LabelTextColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5,
  },
  listContainer: {
    borderColor: BorderColor,
    borderWidth: 1,
    padding: 10,
    backgroundColor: WhiteColor,
  },

  avatar: {

  },
});

export default styles;
