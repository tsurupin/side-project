import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Card, Text, Divider, Badge } from 'react-native-elements';

import styles from './styles';
import { City } from '../../../../interfaces';

type Props = {
  id: string;
  mainPhotoUrl: string;
  details?: string;
  title: string;
  subText?: string | undefined;
  badgeText: string | undefined;
  city: City | undefined;
  onPressCard: (id: string, title: string) => void;
};

const renderCityName = (city: City | undefined) => {
  if (!city) return undefined;
  return <Text style={styles.subText}>{city.fullName}</Text>;
};

const renderSubText = (subText: string | undefined) => {
  if (!subText) return undefined;
  return <Text style={styles.subText}>{subText}</Text>;
};

const renderBadge = (badgeName: string | undefined) => {
  if (!badgeName) return undefined;
  return <Badge value={badgeName} badgeStyle={styles.badgeContainer} textStyle={styles.badgeText} />;
};

const ItemCard: React.SFC<Props> = (props) => {
  const { id, mainPhotoUrl, details, title, subText, badgeText, city, onPressCard } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPressCard(id, title)}>
        <Card
          containerStyle={styles.cardContainer}
          image={{ uri: mainPhotoUrl }}
          imageStyle={styles.imageBox}
          flexDirection="column"
        >
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.mainTextContainer}>
                <Text style={styles.titleText}>{title}</Text>
                {renderCityName(city)}
                {renderSubText(subText)}
              </View>
              {renderBadge(badgeText)}
            </View>

            <View style={styles.subTextContainer}>
              <Divider style={styles.divider} />

              <Text style={styles.leadSentence}>{details}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

ItemCard.defaultProps = {
  details: 'This is details about this project. There are three steps to achive this project'
};

export default ItemCard;
