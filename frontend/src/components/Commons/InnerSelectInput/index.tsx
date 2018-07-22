import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Chevron } from "..";

import styles from "./styles";

type Props = {
  label: string;
  value: string | undefined;
  placeholder: string | undefined;
  onPress: () => void;
};

const placeholderTextColor = "blue";

const InnnerSelectInput: React.SFC<Props> = (props) => {
  const { label, value, placeholder, onPress } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={onPress} style={styles.inputContainer}>
        <Text
          style={[
            styles.inputText,
            value ? {} : { color: placeholderTextColor }
          ]}
        >
          {value || placeholder}
        </Text>
        <View style={styles.chevronContainer}>
          <Chevron />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InnnerSelectInput;
