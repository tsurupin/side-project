import { StyleSheet } from "react-native";
import { BorderColor, MainTextColor, SubTextColor } from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderColor: BorderColor
  },
  title: {
    color: MainTextColor,
    fontSize: 16

  },
  rightTitle: {
    color: SubTextColor,
    fontSize: 16

  }
 
});

export default styles;
