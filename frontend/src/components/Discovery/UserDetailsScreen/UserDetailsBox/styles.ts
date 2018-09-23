import { StyleSheet, Dimensions } from "react-native";
import { SubTextColor, LabelTextColor, ActiveMainColor } from "../../../../constants/colors";
const width = Math.trunc(Dimensions.get("window").width);
const windowHeight = Math.trunc(Dimensions.get("window").height);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({
  container: {
    
  },

  carouselWrapper: {
    height: Math.trunc(height * 0.4)
  },

  contentContainer: {
    width: Math.trunc(width * 0.92),
    marginLeft: Math.trunc(width * 0.04),
    marginRight: Math.trunc(width * 0.04)
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 70,
  },

  mainTextContainer: {
    height:  "100%",
    width: Math.trunc(width * 0.65),
    marginRight: Math.trunc(width * 0.025)
  },

  titleText: {
    fontSize: 24,
    fontWeight: "bold"
  },


  subText: {
    fontSize: 12,
    color: SubTextColor
  },

  badgeContainer: {
    width: Math.trunc(width * 0.25),
    marginTop:  "15%",
    padding: "10%",
    height:  "50%",
    backgroundColor: ActiveMainColor
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
    marginTop: Math.trunc(height * 0.03),
    marginBottom: Math.trunc(height * 0.03),
  },
  
  textGroup: {
    marginBottom: 10
  },
  labelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: LabelTextColor,
    marginBottom: 5
  },
  mainText: {
    fontSize: 16,
  },

  skillListContainer: {
   
  },
  responseLikeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: Math.trunc(width * 0.25),
    marginRight: Math.trunc(width * 0.25)
  },
  likeContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  iconContainer: {
    padding: 10,
    width: 60,
    height: 60,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 30
  }

})

export default styles;