import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { Card, Text, Divider, Badge } from "react-native-elements";

import styles from "./styles";
import { UserCore, ProjectCore, Genre, City } from "../../../../interfaces";

type Props = {
  user: UserCore;
  onPressCard: (id: string) => void;
};

const renderCityName = (city: City | undefined) => {
  return city ? <Text style={styles.mainText}>{city.fullName}</Text> : null;
};
const renderBadge = (genre: Genre | undefined) => {
  if (!genre) return null;
  return (
    <Badge
      value={name}
      containerStyle={styles.badgeContainer}
      textStyle={styles.badgeText}
    />
  );
};

const ItemCard = (props: Props) => {
  const { user, onPressCard } = props;

  const { id, mainPhotoUrl, leadSentence, genre, city, displayName } = user;


  return (
    <TouchableOpacity onPress={() => onPressCard(id)}>
      <View style={[styles.container]}>
        <Card image={{ uri: mainPhotoUrl }} imageStyle={styles.imageBox}>
          <View style={styles.titleBox}>
            <Text style={styles.mainText}>{displayName}</Text>
            {renderBadge(genre)}
          </View>
          {renderCityName(city)}
          <Divider style={styles.divider} />
          <Text style={styles.leadSentence}>{leadSentence}</Text>
        </Card>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
