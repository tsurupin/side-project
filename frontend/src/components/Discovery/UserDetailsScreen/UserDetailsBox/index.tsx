import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { Divider, Badge, Text, Icon } from 'react-native-elements';
import { SkillList, CarouselPanel, TextGroup } from '../../../Common';
import { ACTIVE_MAIN_COLOR } from '../../../../constants/colors';
import { UserDetails, City } from '../../../../interfaces';
import {
  CLOSE_ICON,
  CHECK_ICON,
  HEART_OUTLINE_ICON,
  MEDIUM_ICON_SIZE,
  ICON_MAIN_TYPE,
  ICON_GRAY_COLOR
} from '../../../../constants/icons';
import styles from './styles';

type Props = {
  liked?: boolean;
  rejectLike?: () => void;
  acceptLike?: () => void;
  like?: () => void;
  user: UserDetails;
};

const renderActionContainer = (
  liked: boolean | undefined,
  like: (() => void) | undefined,
  rejectLike: (() => void) | undefined,
  acceptLike: (() => void) | undefined
) => {
  if (liked === undefined) return <View />;
  if (liked) return renderResponseLikeContainer(rejectLike!, acceptLike!);
  return renderLikeContainer(like!);
};

const renderResponseLikeContainer = (rejectLike: () => void, acceptLike: () => void) => {
  return (
    <View style={styles.responseLikeContainer}>
      <Icon
        size={MEDIUM_ICON_SIZE}
        color={ICON_GRAY_COLOR}
        containerStyle={styles.iconContainer}
        name={CLOSE_ICON}
        type={ICON_MAIN_TYPE}
        onPress={rejectLike}
        raised
      />
      <Icon
        size={MEDIUM_ICON_SIZE}
        color={ACTIVE_MAIN_COLOR}
        containerStyle={styles.iconContainer}
        name={CHECK_ICON}
        type={ICON_MAIN_TYPE}
        onPress={acceptLike}
        raised
      />
    </View>
  );
};

const renderLikeContainer = (like: () => void) => {
  return (
    <View style={styles.likeContainer}>
      <Icon
        size={MEDIUM_ICON_SIZE}
        color={ACTIVE_MAIN_COLOR}
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
  if (!city) return undefined;
  return <Text style={styles.subText}>{city.fullName} </Text>;
};

const renderBadge = (badgeName: string | undefined) => {
  if (!badgeName) return undefined;
  return <Badge value={badgeName} containerStyle={styles.badgeContainer} textStyle={styles.badgeText} />;
};

const UserDetailsBox: React.SFC<Props> = (props) => {
  const { liked, rejectLike, acceptLike, like, user } = props;
  const { displayName, occupation, city, companyName, schoolName, occupationType, skills, introduction, photos } = user;
  // occupation = 'Software Engineer';
  // companyName = 'Google';
  // schoolName = 'UC Berkley';
  // introduction =
  //   "I'm a genuine technology lover who codes literally everyday.
  // skills = [
  //   { id: '1', name: 'Python' },
  //   { id: '2', name: 'Ruby' },
  //   { id: '3', name: 'MySQL' },
  //   { id: '4', name: 'GraphQL' },
  //   { id: '5', name: 'Python' },
  // ];
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
            <TextGroup labelName="Company / School" text={`${companyName} /  ${schoolName}`} />
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
