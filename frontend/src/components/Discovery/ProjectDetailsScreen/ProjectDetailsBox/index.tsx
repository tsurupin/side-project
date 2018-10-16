import * as React from "react";
import { View, ScrollView } from "react-native";
import { Divider, Badge, Text, Icon } from "react-native-elements";

import MemberListItem from "../MemberListItem";
import MemberList from "../MemberList";
import { SkillList, CarouselPanel, TextGroup } from "../../../Common";
import { ProjectDetails, City } from "../../../../interfaces";
import { ActiveMainColor } from "../../../../constants/colors";
import {
  CLOSE_ICON,
  CHECK_ICON,
  HEART_OUTLINE_ICON,
  CHECK_OUTLINE_ICON,
  ICON_MAIN_TYPE
} from "../../../../constants/icons";
import styles from "./styles";

type Props = {
  liked: boolean;
  project: ProjectDetails;
  like?: () => void;
  onPressUser: (userId: string) => void;
};

const renderCityName = (city: City | undefined) => {
  if (!city) return undefined;
  return <Text style={styles.subText}>{city.fullName} </Text>;
};

const renderBadge = (badgeName: string | undefined) => {
  if (!badgeName) return undefined;
  return (
    <Badge
      value={badgeName}
      containerStyle={styles.badgeContainer}
      textStyle={styles.badgeText}
    />
  );
};

const renderLikeButton = (liked: boolean, like: any) => {
  if (liked) return <View />;
  return (
    <View style={styles.likeContainer}>
      <Icon
        size={30}
        color={ActiveMainColor}
        iconStyle={styles.iconContainer}
        name={CHECK_ICON}
        type={ICON_MAIN_TYPE}
        onPress={like}
        raised
      />
    </View>
  );
};

const ProjectDetailsBox: React.SFC<Props> = (props) => {
  const { project, onPressUser, liked, like } = props;
  let {
    title,
    genre,
    city,
    leadSentence,
    motivation,
    owner,
    users,
    skills,
    photos
  } = project;
  title = "Block Chain 2.0";
  leadSentence = "This project is for creating new internet";
  motivation =
    "I'm a genuine technology lover who codes literally everyday.\nFor most of my past career, Ive worked for a small team. I love to wear many hats - from backend and front-end to mobile or DevOps, and I am happy to take on any role to make a better product.\nMy true passion is not to learn a new technology itself, but to create a great product with ambitious teammates which contributes to our life.\nI'm a full stack engineer, who is especially proficient in Ruby, Rails and React/Redux.\nMy recent project, built in Rails and React/Redux,  got over 500 stars in GitHub.";

  return (
    <ScrollView
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.carouselWrapper}>
        <CarouselPanel photos={photos} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.mainTextContainer}>
            <Text style={styles.titleText}>{title} </Text>
            {renderCityName(city)}
          </View>
          {renderBadge(genre ? genre.name : undefined)}
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailsContainer}>
          <TextGroup labelName="Lead Sentence" text={leadSentence} />
          <TextGroup labelName="Motivation" text={motivation} />
          <View style={styles.ownerWrapper}>
            <Text style={styles.label}>Owner</Text>
            <MemberListItem key={owner.id} member={owner} onPress={onPressUser} />
          </View>
          <MemberList members={users} onPressUser={onPressUser} />

          <View style={styles.skillListWrapper}>
            <SkillList skills={skills} />
          </View>
        </View>
        {renderLikeButton(liked, like)}
      </View>
    </ScrollView>
  );
};

export default ProjectDetailsBox;
