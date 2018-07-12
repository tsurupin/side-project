import { StyleSheet, Dimensions } from "react-native";
const width = Math.trunc(Dimensions.get("window").width);
const windowHeight = Math.trunc(Dimensions.get("window").height);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({
  container: {
    
  },

  carouselWrapper: {
    height: Math.trunc(height * 0.4)
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: Math.trunc(height * 0.1),
    marginLeft: Math.trunc(width * 0.05),
    marginRight: Math.trunc(width * 0.05),
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
    width: Math.trunc(width * 0.9),
    marginLeft: Math.trunc(width * 0.05),
    marginRight: Math.trunc(width * 0.05),
    marginTop: Math.trunc(height * 0.03),
    marginBottom: Math.trunc(height * 0.03),
  },
  
  textGroup: {
    marginBottom: 10
  },
  labelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 5
  },
  mainText: {
    fontSize: 16,
  },

  skillListContainer: {
    marginLeft: Math.trunc(width * 0.05),
    marginRight: Math.trunc(width * 0.05)
  },
  responseLikeContainer: {

  },
  likeButton: {

  },

})

export default styles;