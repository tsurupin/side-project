import * as React from "react";
import { View, Text } from "react-native";

type Props = {
  id: string;
  comment?: string;
  imageUrl?: string;
};

const MessageDetails = (props: Props) => {
  return (
    <View>
      <Text>{props.comment}</Text>
    </View>
  );
};

export default MessageDetails;
