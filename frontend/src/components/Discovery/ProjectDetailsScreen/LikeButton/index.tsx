import * as React from "react";
import { Button } from "react-native";

type Props = {
  onPress: () => void;
  name: string;
};
const LikeButton = (props: Props) => {
  const { onPress, name } = props;
  return <Button title={name} onPress={onPress} />;
};

export default LikeButton;
