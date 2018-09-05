import { StyleSheet, Dimensions } from "react-native";
import { BackgroundColor } from "../../../../constants/colors";
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    height: height,
    paddingTop: 40
  }
});

export default styles;