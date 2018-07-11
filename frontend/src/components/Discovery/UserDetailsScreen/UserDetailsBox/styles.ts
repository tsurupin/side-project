import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Math.trunc(Dimensions.get("window").width);
const windowHeight = Math.trunc(Dimensions.get("window").height);
const width = Math.trunc(windowWidth * 0.90);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({
  container: {
    

  },
  responseLikeContainer: {

  },
  likeButton: {

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
  detailsContainer: {

  },
  
  textGroup: {

  },
  labelText: {

  },
  mainText: {

  },
  skillListContainer: {

  }

})

export default styles;