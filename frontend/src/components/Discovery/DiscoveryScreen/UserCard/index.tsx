import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { Card, Text, Divider, Badge } from "react-native-elements";

import styles from "./styles";
import { lexicographicSortSchema } from "graphql";
import { UserDetails } from "../../../../interfaces";

type Props = {
  user: UserDetails;
  onPressUserCard: (id: number) => void;
};

class UserCard extends React.Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    console.log("USerCard", user);
    const {
      mainPhotoUrl,
      areaName,
      displayName,
      leadSentence,
      genre
    } = user;
    console.log(
      "USerCard",
      mainPhotoUrl,
      areaName,
      displayName,
      leadSentence,
      genre
    );
    return (
      <TouchableOpacity onPress={() => this.props.onPressUserCard(user.id)}>
        <View style={[styles.container]}>
          <Card image={{ uri: mainPhotoUrl }} imageStyle={styles.imageBox}>
            <View style={styles.titleBox}>
              <Text style={styles.mainText}>{displayName}</Text>
              <Badge
                value={genre.name}
                containerStyle={styles.badgeContainer}
                textStyle={styles.badgeText}
              />
            </View>
            <Text style={styles.mainText}>{areaName}</Text>
            <Divider style={styles.divider} />
            <Text style={styles.leadSentence}>{leadSentence}</Text>
          </Card>
        </View>
      </TouchableOpacity>
    );
  }
}

export default UserCard;
