import { Dimensions, StyleSheet } from 'react-native';
const width = Math.trunc(Dimensions.get('window').width);
const windowHeight = Math.trunc(Dimensions.get('window').height);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({

  container: {
    height: height - 50,
  },
});

export default styles;
