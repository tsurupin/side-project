import { StyleSheet, Dimensions } from "react-native";
const width = Math.trunc(Dimensions.get("window").width);
const windowHeight = Math.trunc(Dimensions.get("window").height);
const height = Math.trunc(windowHeight * 0.85);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 20,
    width: "100%"
  },

  label: {  
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
    marginBottom: 5
  },
  iconContainer: {
    padding: 5,
    width: 30,
    height: 30,
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 15,
    transform: [{rotate: '90deg'}]
  }

})

export default styles;