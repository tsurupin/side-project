import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "grey"
  
  },
  avatar: {

  },
  mainText: {
    marginTop: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 16
  },
  subText: {
    marginTop: 5,
    color: "grey",
    fontSize: 14
  }
})

export default styles;