import * as React from "react";
import { Input } from "react-native-elements";
import styles from "./styles";

type Props = {
  label: string;
  value: string | undefined;
  placeholder: string | undefined;
  onChange: (key: string, value: string | undefined) => void;
};

const placeholderTextColor = "blue";

const InnnerTextInput: React.SFC<Props> = (props) => {
  const { label, value, placeholder, onChange } = props;
  

  return (
    <Input
      placeholder={placeholder}
      containerStyle={styles.container}
      label={label}
      labelStyle={styles.label}
      inputContainerStyle={styles.inputContainer}
      inputStyle={[styles.inputText, {color: value ? "" : placeholderTextColor}]}
      errorStyle={styles.errorText}
      value={value}
      onChangeText={(e) => onChange(labelName, e)}
    />
  );
};

export default InnnerTextInput;
