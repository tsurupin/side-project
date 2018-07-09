import * as React from "react";
import { Image, View } from "react-native";
import { Divider, Badge, Text, Button } from "react-native-elements";
import SkillList from "../SkillList";
import CarouselPanel from "../CarouselPanel";
import { UserDetails, City } from "../../../../interfaces";
import styles from "./styles";

type Props = {
  liked: boolean;
  rejectLike?: () => void;
  acceptLike?: () => void;
  like?: () => void;
  user: UserDetails
}


const renderActionContainer = (liked, like, rejectLike, acceptLike) => {
  if (liked) return renderLikeContainer(like);
  return renderResponseLikeContainer(rejectLike, acceptLike);
}

const renderResponseLikeContainer = (rejectLike, acceptLike) => {
  return(
    <View style={styles.responseLikeContainer}>
      <Button onPress={acceptLike} title="Accept" />
      <Button onPress={rejectLike} title="Reject" />
    </View>
  )
}

const renderLikeContainer = (like) => {
  return(
    <View style={styles.likeButton}>
      <Button onPress={like} title="Like" />
    </View>
  )
}

const renderCityName = (city: City | undefined) => {
  if (!city) return undefined;
  return <Text style={styles.subText}>{city.fullName} </Text>
}

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

const UserDetailsBox: React.SFC<Props> = props => {
  const { liked, rejectLike, acceptLike, like, user} = props;
  const { displayName, occupation, city, companyName, schoolName, occupationType, genre, skills, introduction, photos } = user;
  console.log(user)
  return(
    <View style={styles.container}>
      <CarouselPanel photos={photos} />
      <View style={styles.headerContainer}>
        <View style={styles.mainTextContainer}>
          <Text style={styles.titleText}>{displayName} </Text>
          {renderCityName(city)}
        </View>
        {renderBadge(occupationType ? occupationType.name : undefined)}
      </View>
      <Divider style={styles.divider} />
      <View style={styles.detailsContainer}>
        <View style={styles.textGroup}>
          <Text style={styles.labelText}>Position</Text>
          <Text style={styles.mainText}>{occupation}</Text>
        </View> 
        <View style={styles.textGroup}>
          <Text style={styles.labelText}>Company /School </Text>
          <Text style={styles.mainText}>{`${companyName} /  ${schoolName}`}</Text>
        </View> 
        <View style={styles.textGroup}>
          <Text style={styles.labelText}>Introduction </Text>
          <Text style={styles.mainText}>{introduction}</Text>
        </View> 
        <View style={styles.skillListContainer}>
          <SkillList skills={skills} />
        </View> 
      </View>
      {renderActionContainer(liked, like, rejectLike, acceptLike)}
    </View>

  )
}

export default UserDetailsBox;