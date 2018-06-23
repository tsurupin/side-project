import * as React from "react";
import { UserDetails } from "../../../interfaces";
import { Card, Divider, Text } from "react-native-elements";
import { View } from "react-native";
import styles from "./styles";

const UserDetailsView = (data: any) => {
  console.log("MyUSer", data.user);
  const { photos, displayName, leadSentence } = data.user;
  console.log(photos[photos.length-1].imageUrl)
  // NOTE: local image doesn't appear dynamically qith require. 
  return (
    <View style={[styles.container]}>
      <Card image={{ uri: photos[photos.length-1].imageUrl }} imageStyle={styles.imageBox}>
        <View style={styles.titleBox}>
          <Text style={styles.mainText}>{displayName}</Text>
        </View>
        <Divider style={styles.divider} />
        <Text style={styles.leadSentence}>{leadSentence}</Text>
      </Card>
    </View>
  );
};

export default UserDetailsView;
