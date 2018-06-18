import * as React from "react";
import { View, TouchableOpacity } from "react-native";

import { Card, Text, Divider, Badge } from "react-native-elements";

import styles from "./styles";
import { ProjectCore, Genre, City } from "../../../../interfaces";

type Props = {
  project: ProjectCore;
  onPressCard: (id: string) => void;
};

const renderCityName = (city: City | undefined) => {
  return city ? <Text style={styles.mainText}>{city.fullName}</Text> : null;
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

const ProjectCard = (props: Props) => {
  const { project, onPressCard } = props;

  const { id, mainPhotoUrl, leadSentence, genre, city, title } = project;


  return (
    <TouchableOpacity onPress={() => onPressCard(id)}>
      <View style={[styles.container]}>
        <Card image={{ uri: mainPhotoUrl }} imageStyle={styles.imageBox}>
          <View style={styles.titleBox}>
            <Text style={styles.mainText}>{title}</Text>
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

export default ProjectCard;
