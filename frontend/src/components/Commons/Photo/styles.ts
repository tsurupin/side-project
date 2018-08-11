import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Math.trunc(Dimensions.get("window").width);
const styles = StyleSheet.create({
  container: {
    width: Math.trunc(windowWidth * 0.33),
    height: 100,
    backgroundColor: "black",
    margin: 1
  },
  image: {
    
    borderWidth: 1,
    borderColor: "red"
  }
});
export default styles;