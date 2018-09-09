import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    backgroundColor: "grey"
  },
  label: {
    color: "white",
    fontWeight: "bold",
    height: 34,
    width: "100%",
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 10
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "grey"
  },
  inputInnerContainer: {
    padding: 5
  },
  inputText: {
    color: "black",    
  },
  errorText: {
    color: "red"
  }
});

export default styles;

