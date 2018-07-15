import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={onPress}>
          <Text
            style={[styles.inputText, value ? {} : { color: placeholderTextColor }]}
          >
            {value || placeholder}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InnnerSelectInput;
