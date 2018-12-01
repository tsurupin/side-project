import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Badge, Divider, Icon, Text } from 'react-native-elements';
import { ActiveMainColor } from '../../../../constants/colors';
import {
  CHECK_ICON,
  CHECK_OUTLINE_ICON,
  CLOSE_ICON,
  HEART_OUTLINE_ICON,
  ICON_MAIN_TYPE,
} from '../../../../constants/icons';
import { City, UserDetails } from '../../../../interfaces';
import { CarouselPanel, SkillList, TextGroup } from '../../../Common';
import styles from './styles';

interface Props {
  liked?: boolean;
  rejectLike?: () => void;
  acceptLike?: () => void;
  like?: () => void;
  user: UserDetails;
}

const renderActionContainer = (liked, like, rejectLike, acceptLike) => {
  console.log(liked);
  if (liked === undefined) { return <View />; }
  if (liked) { return renderLikeContainer(like); }
  return renderResponseLikeContainer(rejectLike, acceptLike);
};

const renderResponseLikeContainer = (rejectLike, acceptLike) => {
  return (
    <View style={styles.responseLikeContainer}>

      <Icon
        size={30}
        color="grey"
        containerStyle={styles.iconContainer}
        name={CLOSE_ICON}
        type={ICON_MAIN_TYPE}
        onPress={rejectLike}
        raised
      />
      <Icon
        size={30}
        color={ActiveMainColor}
        containerStyle={styles.iconContainer}
        name={CHECK_ICON}
        type={ICON_MAIN_TYPE}
        onPress={acceptLike}
        raised
      />
    </View>
  );
};

const renderLikeContainer = (like) => {
  return (
    <View style={styles.likeContainer}>
      <Icon
        size={30}
        color={ActiveMainColor}
        containerStyle={styles.iconContainer}
        type={ICON_MAIN_TYPE}
        name={HEART_OUTLINE_ICON}
        onPress={like}
        raised
      />
    </View>
  );
};

const renderCityName = (city: City | undefined) => {
  if (!city) { return undefined; }
  return <Text style={styles.subText}>{city.fullName} </Text>;
};

const renderBadge = (badgeName: string | undefined) => {
  if (!badgeName) { return undefined; }
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
    photos,
  } = user;
  occupation = 'Software Engineer';
  companyName = 'Google';
  schoolName = 'UC Berkley';
  introduction =
    "I'm a genuine technology lover who codes literally everyday.\nFor most of my past career, Ive worked for a small team. I love to wear many hats - from backend and front-end to mobile or DevOps, and I am happy to take on any role to make a better product.\nMy true passion is not to learn a new technology itself, but to create a great product with ambitious teammates which contributes to our life.\nI'm a full stack engineer, who is especially proficient in Ruby, Rails and React/Redux.\nMy recent project, built in Rails and React/Redux,  got over 500 stars in GitHub.";
  skills = [
    { id: '1', name: 'Python' },
    { id: '2', name: 'Ruby' },
    { id: '3', name: 'MySQL' },
    { id: '4', name: 'GraphQL' },
    { id: '5', name: 'Python' },
  ];
  return (
      <View style={styles.container}>
        <ScrollView
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <View style={styles.carouselWrapper}>
            <CarouselPanel photos={photos} />
          </View>
          <View style={styles.contentContainer}>
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
              <View>
                <SkillList skills={skills} />
              </View>
            </View>
            {renderActionContainer(liked, like, rejectLike, acceptLike)}
          </View>
        </ScrollView>
      </View>
    );
};

export default UserDetailsBox;
