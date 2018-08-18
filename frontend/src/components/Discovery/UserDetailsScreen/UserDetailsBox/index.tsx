import * as React from "react";
import { View, ScrollView } from "react-native";
import { Divider, Badge, Text, Icon } from "react-native-elements";
import { SkillList, CarouselPanel, TextGroup } from "../../../Commons";
import { UserDetails, City } from "../../../../interfaces";
import {
  CLOSE_ICON,
  HEART_OUTLINE_ICON,
  CHECK_OUTLINE_ICON
} from "../../../../constants/icons";
import styles from "./styles";

type Props = {
  liked?: boolean;
  rejectLike?: () => void;
  acceptLike?: () => void;
  like?: () => void;
  user: UserDetails;
};

const renderActionContainer = (liked, like, rejectLike, acceptLike) => {
  if (liked === undefined) return <View/>
  if (liked) return renderLikeContainer(like);
  return renderResponseLikeContainer(rejectLike, acceptLike);
};

const renderResponseLikeContainer = (rejectLike, acceptLike) => {
  return (
    <View style={styles.responseLikeContainer}>
      <Icon
        size={40}
        color="blue"
        containerStyle={styles.iconContainer}
        name={CHECK_OUTLINE_ICON}
        type="MaterialCommunityIcons"
        onPress={acceptLike}
      />
      <Icon
        size={40}
        color="blue"
        containerStyle={styles.iconContainer}
        name={CLOSE_ICON}
        type="MaterialCommunityIcons"
        onPress={rejectLike}
      />
    </View>
  );
};

const renderLikeContainer = (like) => {
  return (
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
  );
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

const UserDetailsBox: React.SFC<Props> = (props) => {
  const { liked, rejectLike, acceptLike, like, user } = props;
  let {
    displayName,
    occupation,
    city,
    companyName,
    schoolName,
    occupationType,
    skills,
    introduction,
    photos
  } = user;
  occupation = "Software Engineer";
  companyName = "Google";
  schoolName = "UC Berkley";
  introduction =
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
          <Text style={styles.titleText}>{displayName} </Text>
          {renderCityName(city)}
        </View>
        {renderBadge(occupationType ? occupationType.name : undefined)}
      </View>
      <Divider style={styles.divider} />
      <View style={styles.detailsContainer}>
        <TextGroup labelName="Occupation" text={occupation} />
        <TextGroup
          labelName="Company / School"
          text={`${companyName} /  ${schoolName}`}
        />
        <TextGroup labelName="Introduction" text={introduction} />
        <View style={styles.skillListContainer}>
          <SkillList skills={skills} />
        </View>
      </View>
      {renderActionContainer(liked, like, rejectLike, acceptLike)}
    </ScrollView>
  );
};

export default UserDetailsBox;
