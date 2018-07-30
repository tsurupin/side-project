import * as React from "react";
import { View, Text } from "react-native";
import { Input } from "react-native-elements";
import styles from "./styles";

type Props = {
  label: string;
  value: string | undefined;
  placeholder: string | undefined;
  style?: object;
  onChange: (key: string, value: string | undefined) => void;
};

const placeholderTextColor = "blue";

const InnnerDetailsInput: React.SFC<Props> = (props) => {
  const { label, value, placeholder, style, onChange } = props;
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input
        placeholder={placeholder}
        numberOfLines={3}
        ellipsizeMode='head'
        containerStyle={[styles.inputContainer, style | {}]}
        inputContainerStyle={styles.inputInnerContainer}
        inputStyle={[styles.inputText, value ? {} : {color: placeholderTextColor}]}
        errorStyle={styles.errorText}
        value={value}
        onChangeText={(e) => onChange(label, e)}
      />
    </View>
  );
};

export default InnnerDetailsInput;

