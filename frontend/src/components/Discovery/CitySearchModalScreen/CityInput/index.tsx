import * as React from "react";
import { Input } from "react-native-elements";
import styles from "./styles";

type Props = {
  name: string | undefined;
  onChangeText: (name) => void;
};

const CityInput: React.SFC<Props> = (props) => {
  const { name, onChangeText } = props;
  return (
    <Input
      placeholder="City(ex: San Francisco)"
      containerStyle={styles.inputContainer}
      value={name}
      onChangeText={(val: string) => onChangeText(val)}
    />
  );
};

export default CityInput;
