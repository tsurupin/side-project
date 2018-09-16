import { StyleSheet } from "react-native";
import { BackgroundColor } from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor
  },
  avatarContainer: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%"
  }
});
export default styles;