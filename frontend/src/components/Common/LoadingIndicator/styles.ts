
import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Math.trunc(Dimensions.get("window").width);
const windowHeight = Math.trunc(Dimensions.get("window").height);

const styles = StyleSheet.create({
  container: {
    width: windowWidth,  
    height: windowHeight,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;

