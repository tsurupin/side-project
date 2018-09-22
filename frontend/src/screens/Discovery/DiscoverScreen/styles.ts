import { StyleSheet } from "react-native";
import { BackgroundColor } from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BackgroundColor
  },
  cardListContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row"
  }
});

export default styles;
