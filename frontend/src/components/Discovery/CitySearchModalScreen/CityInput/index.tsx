import * as React from "react";
import { Input } from "react-native-elements";
import styles from "./styles";

type Props = {
  name: string | undefined;
  onChangeText: (name) => void;
};

type State = {
  name: string | undefined;
};

class CityInput extends React.Component<Props, State> {
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
        placeholder="City(ex: San Francisco)"
        containerStyle={styles.inputContainer}
        value={name}
        onChangeText={(val: string) => this.props.onChangeText(val)}
      />
    );
  }
}

export default CityInput;
