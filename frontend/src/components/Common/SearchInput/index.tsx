import * as React from "react";
import { View } from "react-native";
import { Input, Icon } from "react-native-elements";
import { ICON_MAIN_TYPE, CLOSE_CIRCLE_ICON, MAGNIFY_ICON } from "../../../constants/icons";
import styles from "./styles";

type Props = {
  name: string;
  onChangeText: (name) => void;
};

const SearchInput: React.SFC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search"
        leftIcon={
          <Icon
            type={ICON_MAIN_TYPE}
            name={MAGNIFY_ICON}
            size={24}
            color="black"
          />
        }
        leftIconContainerStyle={styles.leftIconContainer}
        rightIcon={
          <Icon
            type={ICON_MAIN_TYPE}
            name={CLOSE_CIRCLE_ICON}
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

export default SearchInput;
