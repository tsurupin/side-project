import * as React from "react";
import { View, Text } from "react-native";

type Props = {
  id: string;
  comment?: string;
  imageUrl?: string;
};

const MessageDetails: React.SFC<Props> = props  => {
  return (
    <View>
      <Text>{props.comment}</Text>
    </View>
  );
};

export default MessageDetails;
