import * as React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { Card, Text, Divider, Badge } from "react-native-elements";

import styles from "./styles";
import { UserCore, OccupationType, City } from "../../../../interfaces";

type Props = {
  user: UserCore;
  onPressCard: (id: string) => void;
};

const renderCityName = (city: City | undefined) => {
  if (!city) return null;
  return <Text style={styles.subText}>{city.fullName}</Text>;
};

const renderProfession = (
  occupation: string | undefined,
  companyName: string | undefined
) => {
  let profession = "";
  if (occupation && companyName) {
    profession = `${occupation}, ${companyName}`;
  } else {
    profession = `${occupation || companyName}`;
  }
  return <Text style={styles.subText}>{profession}</Text>;
};

const renderBadge = (occupationType: OccupationType | undefined) => {
  if (!occupationType) return null;
  return (
    <Badge
      value={occupationType.name}
      containerStyle={styles.badgeContainer}
      textStyle={styles.badgeText}
    />
  );
};

const UserCard = (props: Props) => {
  const { user, onPressCard } = props;
  console.log("user", user);

  const {
    id,
    mainPhotoUrl,
    introduction,
    occupationType,
    occupation,
    companyName,
    city,
    displayName
  } = user;

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={() => onPressCard(id)}>
      <Card
        containerStyle={styles.cardContainer}
        image={{ uri: mainPhotoUrl }}
        imageStyle={styles.imageBox}
        flexDirection="column"
      >
        <View style={styles.textContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.mainTextContainer}>
              <Text style={styles.titleText}>{displayName}</Text>
              {renderCityName(city)}
              {renderProfession(occupation, companyName)}
            </View>
            {renderBadge(occupationType)}
          </View>

          <View style={styles.subTextContainer}>
            <Divider style={styles.divider} />
            <Text style={styles.leadSentence}>
              {
                "Hi! I’m Tomoaki Tsuruta and welcome to my site. I’m a web developer  in San Francisco. I’m interested in the technology that is useful to improved UX."
              }
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
    </View>
  );
};

export default UserCard;
