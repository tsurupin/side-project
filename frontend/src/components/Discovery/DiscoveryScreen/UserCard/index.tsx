import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { Card, Text, Divider, Badge } from "react-native-elements";

import styles from "./styles";
import { UserCore, Genre, City } from "../../../../interfaces";

type Props = {
  user: UserCore;
  onPressCard: (id: string) => void;
};

const renderCityName = (city: City | undefined) => {
  return city ? <Text style={styles.subText}>{city.fullName}</Text> : null;
};
const renderBadge = (genre: Genre | undefined) => {
  if (!genre) return null;
  return (
    <Badge
      value={genre.name}
      containerStyle={styles.badgeContainer}
      textStyle={styles.badgeText}
    />
  );
};

const UserCard = (props: Props) => {
  const { user, onPressCard } = props;
  console.log(user)

  const { id, mainPhotoUrl, introduction, genre, city, displayName } = user;

  return (
    <TouchableOpacity onPress={() => onPressCard(id)}>
      <Card
        containerStyle={styles.container}
        image={{ uri: mainPhotoUrl }}
        imageStyle={styles.imageBox}
        flexDirection="column"
      >
        <View style={styles.mainTextBox}>
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>{displayName}</Text> 
            {renderBadge(genre)}
          </View>
          {renderCityName(city)}
        </View>
        
        <Divider style={styles.divider} />
        <Text style={styles.leadSentence}>{introduction}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default UserCard;
