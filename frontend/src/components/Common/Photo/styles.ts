import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Math.trunc(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    width: Math.trunc(windowWidth * 0.33),
    height: 100,
    margin: 1,
    borderWidth: 1,
    borderColor: 'grey',
  },
  image: {}
});
export default styles;
