import * as React from "react";
import { View, ScrollView, FlatList } from "react-native";
import { Divider, Badge, Text, Icon } from "react-native-elements";
import UserList from "../UserList";
import UserListItem from "../UserListItem";
import { SkillList, CarouselPanel, TextGroup } from "../../../Commons";
import { ProjectDetails, City, UserCore } from "../../../../interfaces";
import {
  CLOSE_ICON,
  HEART_OUTLINE_ICON,
  CHECK_OUTLINE_ICON,
  UNFOLD_LESS_HORIZONTAL_ICON,
  UNFOLD_MORE_HORIZONTAL_ICON
} from "../../../../constants/icons";
import styles from "./styles";

type Props = {
  liked: boolean;
  isOpen: boolean;
  project: ProjectDetails;
  like?: () => void;
  onPressUser: (userId: string) => void;
  onToggleIcon: (boolean) => void;
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

const renderUserListToggleIcon = (
  isOpen: boolean,
  onToggleIcon: (boolean) => void
) => {
  return (
    <Icon
      size={20}
      color="blue"
      containerStyle={styles.userListIconContainer}
      type="MaterialCommunityIcons"
      name={isOpen ? UNFOLD_LESS_HORIZONTAL_ICON : UNFOLD_MORE_HORIZONTAL_ICON}
      onPress={() => onToggleIcon(isOpen)}
    />
  );
};

const renderUserList = (isOpen: boolean, users: UserCore[], onPressUser: (userId: string) => void) => {
  if (!isOpen) return;

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => {
        return <UserListItem user={item} onPress={onPressUser} />;
      }}
    />
  );
};

const ProjectDetailsBox: React.SFC<Props> = (props) => {
  const { liked, like, project, isOpen, onToggleIcon, onPressUser } = props;
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
  title = "Block Chain 2.0"
  leadSentence = "This project is for creating new internet";
  motivation =
    "I'm a genuine technology lover who codes literally everyday.\nFor most of my past career, Ive worked for a small team. I love to wear many hats - from backend and front-end to mobile or DevOps, and I am happy to take on any role to make a better product.\nMy true passion is not to learn a new technology itself, but to create a great product with ambitious teammates which contributes to our life.\nI'm a full stack engineer, who is especially proficient in Ruby, Rails and React/Redux.\nMy recent project, built in Rails and React/Redux,  got over 500 stars in GitHub.";
  return (
    <ScrollView
      alwaysBounceVertical={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.carouselWrapper}>
        <CarouselPanel photos={photos} />
      </View>
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
          <UserListItem key={owner.id} user={owner} onPress={onPressUser} />
        </View>
        <View style={styles.userListWrapper}>
          <View style={styles.userListHeader}>
            <Text style={styles.label}>{`Members (${users.length})`}</Text>
            {renderUserListToggleIcon(isOpen, onToggleIcon)}
          </View>
          {renderUserList(isOpen, users, onPressUser)}
        </View>
        <View style={styles.skillListWrapper}>
          <SkillList skills={skills} />
        </View>
      </View>
      <View style={styles.likeContainer}>
        <Icon
          size={40}
          color="blue"
          containerStyle={styles.iconContainer}
          type="MaterialCommunityIcons"
          name={HEART_OUTLINE_ICON}
          onPress={like}
        />
      </View>
    </ScrollView>
  );
};

export default ProjectDetailsBox;
