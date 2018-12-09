import { StyleSheet, Dimensions } from 'react-native';
const windowHeight = Math.trunc(Dimensions.get('window').height);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({
  container: {
    height: height - 50
  }
});

export default styles;
