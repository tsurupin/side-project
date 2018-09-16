import { StyleSheet, Dimensions } from "react-native";
import { BackgroundColor } from "../../../constants/colors";
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    padding: 10,
    height
  }
})

export default styles;