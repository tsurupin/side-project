import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
const width = Math.trunc(Dimensions.get('window').width);
interface Style {
  container: ViewStyle;
  image: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0,
    backgroundColor: 'black',
  },
  image: {
    width,
    height: '100%',
  },
});

export default styles;
