import * as React from "react";
import { UserDetails } from "../../../interfaces";
import { Card, Divider, Text } from "react-native-elements";
import { View } from "react-native";
import styles from "./styles";

type Props = {
  user: UserDetails;
};

const DEFAULR_URL = "https://placehold.it/100x100";

const UserDetailsView: React.SFC<Props> = (props) => {
  const { user } = props;

  const { photos, displayName, leadSentence } = user;

  const firstImageUrl = photos.length > 0 ? photos[0].imageUrl : DEFAULR_URL;
  // NOTE: local image doesn't appear dynamically qith require.
  return (
    <View style={[styles.container]}>
      <Card image={{ uri: firstImageUrl }} imageStyle={styles.imageBox}>
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
