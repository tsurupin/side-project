import { Dimensions, StyleSheet } from 'react-native';
const width = Math.trunc(Dimensions.get('window').width) - 30;
const styles = StyleSheet.create({
  container: {
    width: Math.trunc(width * 0.33),
    height: '100%',
    marginRight: 5,
    padding: 5,
  },
  innnerContainer: {
    borderWidth: 1,
    borderRadius: 3,
    borderStyle: 'dotted',
    borderColor: 'grey',
    height: 100,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  emptyImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right:  0,
  },

});
export default styles;
