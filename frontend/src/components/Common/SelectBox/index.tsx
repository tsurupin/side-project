import * as React from 'react';
import { ListItem } from 'react-native-elements';
import styles from './styles';

interface Props {
  keyName: string;
  label: string;
  placeholder: string;
  value: string | number | undefined;
  items: any[];
  needTopDivider?: boolean;
  onPress: (
    items: any[],
    key: string,
    label: string,
    selectedValue: string | number | undefined,
  ) => void;
}

const SelectBox = (props: Props) => {
  const {
    placeholder,
    value,
    items,
    keyName,
    label,
    needTopDivider,
    onPress,
  } = props;

  const item = items.find((item) => {
    return (item.id || item.value) == value;
  });

  const title: string = item ? item.name : placeholder;

  return (
    <ListItem
      key={title}
      title={label}
      chevron
      topDivider={needTopDivider || false}
      bottomDivider
      rightTitle={title}
      onPress={() => onPress(items, keyName, label, title)}
      containerStyle={styles.container}
      titleStyle={styles.title}
      rightTitleStyle={styles.rightTitle}
    />
  );
};

export default SelectBox;
