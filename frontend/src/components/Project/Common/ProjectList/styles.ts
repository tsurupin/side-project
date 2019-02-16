import { StyleSheet, Dimensions } from 'react-native';
const width = Math.trunc(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    height: 80
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  blankContainer: {
    width,
    height: '88.3%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default styles;
