import { StyleSheet } from "react-native";
import {  SubTextColor, LabelTextColor, BorderColor, WhiteColor } from "../../../constants/colors";


const styles = StyleSheet.create({

  container: {
    marginTop: 10,
    marginBottom: 20

  },
  label: {

    color: LabelTextColor,
    fontSize: 12,
    marginLeft: 10,
    marginBottom: 5
  },
  itemContainer: {
    height: 48,
    borderColor: BorderColor,
    backgroundColor: WhiteColor
  },
  placeholder: {

  },
  title: {
    color: SubTextColor,
    fontSize: 16

  }

})

export default styles;