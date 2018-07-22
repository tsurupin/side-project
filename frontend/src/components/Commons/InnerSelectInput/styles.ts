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
    paddingTop: 18,
    paddingLeft: 10,
  },
  inputContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 3,
    paddingTop: 18,
    width: "100%",
  },
  inputText: {
    color: "black",    
  },
  chevronContainer: {
    paddingRight: 10
  },
  errorText: {
    color: "red"
  }
});

export default styles;