import * as React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles';

import { City } from '../../../../interfaces';

type Props = {
  cities: City[];
  onPress: (city: City) => void;
};

const CityList: React.SFC<Props> = ({ cities, onPress }) => {
  return (
    <View style={styles.listContainer}>
      {cities.map((city: City) => {
        return (
          <ListItem
            key={city.id}
            containerStyle={styles.listItemContainer}
            title={city.fullName}
            bottomDivider
            onPress={() => onPress(city)}
          />
        );
      })}
    </View>
  );
};

export default CityList;
