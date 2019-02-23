import { StyleSheet, Dimensions } from 'react-native';
const width = Math.trunc(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    height: '100%'
  }
});

export default styles;
