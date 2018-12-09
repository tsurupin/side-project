import { StyleSheet } from 'react-native';
import { BorderColor, LabelTextColor } from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {},
  label: {
    color: LabelTextColor,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 5
  },
  itemContainer: {
    height: 80,
    borderColor: BorderColor
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default styles;
