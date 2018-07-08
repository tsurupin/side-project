import * as React from "react";
import { Input } from "react-native-elements";
import styles from "./styles";

type Props = {
  name: string;
  onChangeText: (name) => void;
};

const SkillInput: React.SFC<Props> = props => {

  return (
    <Input
      placeholder="Skill(ex: Ruby)"
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      value={props.name}
      onChangeText={(val: string) => props.onChangeText(val)}
    />
  );
  
}

export default SkillInput;
