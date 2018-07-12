import { StyleSheet, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  container: {
   
  },
  labelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 5
  },
  badgeListContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
 
  badgeContainer: {
    padding: 5,
    height: 30,
    marginLeft: 10,
    marginBottom: 10
  },
  badgeText: {
    color: "white",
    fontSize: 14
  }
})

export default styles;