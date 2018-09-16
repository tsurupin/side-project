import { StyleSheet, Dimensions } from "react-native";
import { BackgroundColor, SubTextColor, MainTextColor,BorderColor } from "../../../../constants/colors";

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    height
  },
  inputContainer: {},
  buttonFormBox: {},
  textLabel: {},
  itemContainer: {
    height: 48,
    borderColor: BorderColor
  },
  itemTitle: {
    color: MainTextColor,
    fontSize: 16
  },
  rightTitle: {
    color: SubTextColor,
    fontSize: 16
  }
});

export default styles;