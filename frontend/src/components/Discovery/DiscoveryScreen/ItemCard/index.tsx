import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { Card, Text, Divider, Badge } from "react-native-elements";

import styles from "./styles";
import { UserCore, ProjectCore, Genre } from "../../../../interfaces";

type Props = {
  item: UserCore | ProjectCore;
  onPressCard: (id: string) => void;
};

const renderAreaName = (name: string) => {
  return name ? <Text style={styles.mainText}>{name}</Text> : null;
};
const renderBadge = (genre: Genre) => {
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
  const { item, onPressCard } = props;

  const { id, mainPhotoUrl, leadSentence, genre, areaName } = item;
  const name = item.displayName;

  return (
    <TouchableOpacity onPress={() => onPressCard(id)}>
      <View style={[styles.container]}>
        <Card image={{ uri: mainPhotoUrl }} imageStyle={styles.imageBox}>
          <View style={styles.titleBox}>
            <Text style={styles.mainText}>{name}</Text>
            {renderBadge(genre)}
          </View>
          {renderAreaName(areaName)}
          <Divider style={styles.divider} />
          <Text style={styles.leadSentence}>{leadSentence}</Text>
        </Card>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
