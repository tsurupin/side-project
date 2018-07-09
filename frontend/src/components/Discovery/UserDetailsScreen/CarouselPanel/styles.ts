import { StyleSheet, ViewStyle, Dimensions } from "react-native";
const width = Math.trunc(Dimensions.get("window").width);
type Style = {
  container: ViewStyle;
  image: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    height: 200,
    flexDirection: "row"
  },
  image: {
    width,
    height: 200
  }
})

export default styles;