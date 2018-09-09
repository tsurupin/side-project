import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Math.trunc(Dimensions.get("window").width);
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
   
  },
  itemContainer: {
    flexDirection: "row",
    height: 100,
    width: windowWidth,
  },
  buttonContainer: {
    margin: 1,
    width: Math.trunc(windowWidth * 0.33),
    height: 100
  }

})

export default styles;