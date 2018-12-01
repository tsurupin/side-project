import * as React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import styles from './styles';

interface Props {
  label: string;
  keyName: string;
  value: string | undefined;
  placeholder: string;
  onPress: (
    keyName: string,
    value: string | undefined,
    placeholder: string,
  ) => void;
}

const TextAreaListItem: React.SFC<Props> = (props) => {
  const { label, keyName, value, placeholder, onPress } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ListItem
        key={keyName}
        containerStyle={styles.itemContainer}
        title={value || placeholder}
        titleStyle={styles.title}
        chevron
        topDivider
        bottomDivider
        onPress={() => onPress(keyName, value, placeholder)}
      />
    </View>
  );
};

export default TextAreaListItem;
