import * as React from "react";
import { UserDetails } from "../../../interfaces";

import { View } from "react-native";



const UserDetailsView = (user: any) => {
  return <View>{user.displayName}</View>
}

export default UserDetailsView;