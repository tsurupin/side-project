import { StyleSheet, Dimensions } from "react-native";
import { BackgroundColor, LabelTextColor, MainTextColor,BorderColor } from "../../../constants/colors";

const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    height: height
  },
  text: {
    width: "80%"
  },
  divider: {

  },
  icon: {
    width: "20%"
  },
  selectedItemContainer: {
    marginTop: 40,
    marginBottom: 40
  },
  optionsContainer: {
    flexDirection: "row",
    maxHeight: height,
    justifyContent: "space-between",
  },
  itemContainer: {
    height: 48,
    borderColor: BorderColor
  },
  title: {
    color: MainTextColor,
    fontSize: 16
  },
  label: {
    color: LabelTextColor,
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5
  }
});

export default styles;
