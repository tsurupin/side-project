import * as React from "react";
import { UserDetails } from "../../../interfaces";

import { View, Text } from "react-native";



const UserDetailsView = (data: any) => {
  console.log("MyUSer", data.user);
  return <View><Text>{data.user.displayName}</Text></View>
}

export default UserDetailsView;