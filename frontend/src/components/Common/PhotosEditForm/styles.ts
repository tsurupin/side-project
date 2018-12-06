import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Math.trunc(Dimensions.get('window').width) - 20;
const styles = StyleSheet.create({
  container: {},
  listContainer: {
    flexDirection: 'row',
    width: windowWidth,
    height: 115,
    marginBottom: 10
  }
});

export default styles;
