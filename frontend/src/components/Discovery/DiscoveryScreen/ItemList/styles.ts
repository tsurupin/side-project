import { StyleSheet, ViewStyle, Dimensions  } from "react-native";
import { BackgroundColor } from "../../../../constants/colors";
const width = Math.trunc(Dimensions.get("window").width);
const height = Math.trunc(Dimensions.get("window").height);

type Style = {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  blankContainer: {
    backgroundColor: BackgroundColor,
    width: width,
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: "bold"
  }
});

export default styles;
