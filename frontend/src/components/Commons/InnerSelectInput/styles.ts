import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    height: 50,
    fontSize: 14,
    
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "grey"
    
  },
  label: {
    flex: 1,
    color: "gray",
    fontWeight: "bold",
    paddingTop: 23,
    paddingLeft: 10,
  },
  inputContainer: {
    flex: 3,
    borderBottomWidth: 0
  },
  inputText: {
    color: "black"
  },
  errorText: {
    color: "red"
  }
});

export default styles;
