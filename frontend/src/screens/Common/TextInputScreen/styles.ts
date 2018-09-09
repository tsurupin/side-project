import { StyleSheet, Dimensions } from "react-native";
import { BackgroundColor, WhiteColor, MainTextColor,BorderColor, ActiveMainColor } from "../../../constants/colors";
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    height: height,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  inputTextContainer: {
    borderColor: BorderColor,
    backgroundColor: WhiteColor,
    padding: 10
  },
  inputText: {
    color: MainTextColor,
    fontSize: 16,
    paddingRight: 5
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: 'center',
    justifyContent:'center'
  },
  button: {
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    height: 48,
    width: 200,
    backgroundColor: ActiveMainColor,
  },
  buttonTitle: {
    color: WhiteColor,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },

})

export default styles;