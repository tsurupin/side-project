import * as React from "react";
import { View } from "react-native";
import { Input, Icon } from "react-native-elements";
import styles from "./styles";

type Props = {
  name: string;
  onChangeText: (name) => void;
};

const SkillInput: React.SFC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search"
        leftIcon={
          <Icon
            type="material-community"
            name="magnify"
            size={24}
            color="black"
          />
        }
        leftIconContainerStyle={styles.leftIconContainer}
        rightIcon={
          <Icon
            type="material-community"
            name="close-circle"
            size={24}
            color="black"
            onPress={() => props.onChangeText("")}
          />
        }
        rightIconContainerStyle={styles.rightIconContainer}
        containerStyle={styles.inputContainer}
        inputContainerStyle={[styles.inputTextContainer,{borderBottomWidth: 0}]}
        value={props.name}
        onChangeText={(val: string) => props.onChangeText(val)}
      />
    </View>
  );
};

export default SkillInput;
