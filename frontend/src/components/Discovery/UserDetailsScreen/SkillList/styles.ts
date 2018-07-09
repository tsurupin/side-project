import { StyleSheet, ViewStyle } from "react-native";

type Style = {
  container: ViewStyle;
  badgeContainer: ViewStyle;
  badgeText: ViewStyle;
}

const styles = StyleSheet.create({
  container: {
   
  },
  badgeContainer: {
    padding: 5
  },
  badgeText: {
    color: "white",
    fontSize: 12
  }
})

export default styles;