import * as React from "react";
import { ListItem } from "react-native-elements";
import styles from "./styles";


type Props = {
  key: string;
  placeholder: string;
  value: string | number | undefined;
  items: any[],
  onPress: (items: any[], selectedValue: string | number | undefined) => void;
}

const SelectBox = (props: Props) => {
  const { key, placeholder, value, items, onPress} = props;
  const valueName = items.find(item => {
    if (item.hasOwnProprty('id')) {
      return item.id === value
    } else {
      return item.value == value
    }
  })

  return(
    <ListItem
      title={valueName || placeholder}
      chevron
      bottomDivider
      onPress={() => onPress(items, value)}
    />
  )
}

export default SelectBox;

