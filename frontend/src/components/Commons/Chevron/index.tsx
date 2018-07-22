import * as React from "react";
import { Platform } from "react-native";
import { Icon } from "react-native-elements";

type Props = {
  color?: string;
  size?: number
};

const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "grey";

const Chevron: React.SFC<Props> = (props) => {
  const { color, size } = props;
  return (
    <Icon
      type={Platform.OS === "ios" ? "ionicon" : "material"}
      name={
        Platform.OS === "ios" ? "ios-arrow-forward" : "keyboard-arrow-right"
      }
      size={size || DEFAULT_SIZE}
      color={color || DEFAULT_COLOR}
    />
  );
};

export default Chevron;
