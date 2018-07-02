import * as React from "react";
import { Input } from "react-native-elements";
import styles from "./styles";

type Props = {
  name: string;
  onChangeText: (name) => void;
};

type State = {
  name: string;
};

class SkillInput extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name
    };
  }

  render() {
    const { name } = this.state;
    return (
      <Input
        placeholder="Skill(ex: Ruby)"
        containerStyle={styles.inputContainer}
        value={name}
        onChangeText={(val: string) => this.props.onChangeText(val)}
      />
    );
  }
}

export default SkillInput;
