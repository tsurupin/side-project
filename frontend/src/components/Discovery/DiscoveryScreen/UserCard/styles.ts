import { StyleSheet, Dimensions } from "react-native";
const width = Math.trunc(Dimensions.get("window").width * 0.95);

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    marginLeft: Math.trunc(width * 0.05),
    marginRight: Math.trunc(width * 0.05)
  },
  imageBox: {
    width: "100%",
    height:  Math.trunc(width * 0.5)
  },
  mainTextBox: {
    height:  Math.trunc(width * 0.15)
  },
  titleBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'flex-start',
    height:  Math.trunc(width * 0.1),
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10
  },
  badgeContainer: {
    paddingTop:  Math.trunc(width * 0.015),
    height:  Math.trunc(width * 0.07)
  },
  badgeText: {

  },
  subText: {
    fontSize: 16
  },

  divider: {
    marginTop: 5,
    height: 1
  },
  leadSentence: {
    paddingTop: 5
  }

});

export default styles;
