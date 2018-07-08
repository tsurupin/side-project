import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Math.trunc(Dimensions.get("window").width);
const windowHeight = Math.trunc(Dimensions.get("window").height);
const width = Math.trunc(windowWidth * 0.90);
const height = Math.trunc(windowHeight * 0.85);
console.log(height)
const styles = StyleSheet.create({
  container: {

  },
  cardContainer: {
    width,
    marginTop: Math.trunc(height * 0.07),
    height: Math.trunc(height * 0.93),
    marginLeft: Math.trunc(windowWidth * 0.05),
    marginRight: Math.trunc(windowWidth * 0.05),
  },
  imageBox: {
    width: "100%",
    height:  Math.trunc(height * 0.4),
  },
  textContainer: {
    height:  Math.trunc(height * 0.4),
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  mainTextContainer: {
    height:  "100%",
    maxWidth: Math.trunc(width * 0.625),
    marginRight: Math.trunc(width * 0.075)
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold"
  },

  subTextContainer: {
    flex: 2
  },
  subText: {
    fontSize: 16
  },

  badgeContainer: {
    maxWidth: Math.trunc(width * 0.3),
    marginTop:  "15%",
    padding: "10%",
    height:  "50%",
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: "white"
  },

  divider: {
    height: 1
  },
  leadSentence: {
    paddingTop:  Math.trunc(height * 0.01),
    paddingBottom:  Math.trunc(height * 0.01),
    fontSize: 16
  }

});

export default styles;
