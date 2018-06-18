import { Dimensions } from "react-native";
const width = Math.trunc(Dimensions.get("window").width * 0.95);

const styles = {
  container: {
    width,
    paddingTop: 10,
    backgroundColor: "black",
    paddingLeft: Math.trunc(width * 0.025),
    paddingRight: Math.trunc(width * 0.025)
  },
  imageBox: {},
  titleBox: {},
  mainText: {},
  badgeContainer: {},
  badgeText: {},
  divider: {},
  leadSentence: {}
};

export default styles;
