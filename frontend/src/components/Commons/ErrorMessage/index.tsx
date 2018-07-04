import * as React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const ErrorMessage = (message: string) => {
  return (
  <View>
     <Text>{message}</Text>
  </View>
  )
};

export default ErrorMessage;
