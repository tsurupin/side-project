import * as React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles';

import { City } from '../../../../interfaces';

interface Props {
  cities: City[];
  onPress: (city: City) => void;
}

const CityList: React.SFC<Props> = (props) => {
  return (
    <View style={styles.listContainer}>
      {props.cities.map((city: City) => {
        return (
          <ListItem
            key={city.id}
            containerStyle={styles.listItemContainer}
            title={city.fullName}
            bottomDivider
            onPress={() => props.onPress(city)}
          />
        );
      })}
    </View>
  );
};

export default CityList;
