import { StyleSheet } from "react-native";
import {
  SegmentControlActiveColor,
  SegmentControlColor,
  WhiteColor
} from "../../../constants/colors"
const styles = StyleSheet.create({
  tabContainerStyle: {
  
  },
  tabStyle: {
    height: 40,
    backgroundColor: WhiteColor,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRightColor: WhiteColor,
    borderBottomColor: SegmentControlColor
  },
  tabTextStyle: {

    color: SegmentControlColor
  },
  activeTabStyle: {
    height: 40,
    backgroundColor: WhiteColor,
    borderBottomWidth: 4,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderRightColor: WhiteColor,
    borderBottomColor: SegmentControlActiveColor

  },
  activeTabTextStyle: {
    color: SegmentControlActiveColor
  }
})

export default styles;