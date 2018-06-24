import * as React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./styles";

const INDICATOR_COLOR = "#0000ff";
const LoadingIndicator = () => {
  return(
    <View>
      <ActivityIndicator size="large" color={INDICATOR_COLOR} />
    </View>
  )
}

export default LoadingIndicator;


