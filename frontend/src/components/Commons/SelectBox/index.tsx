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
  const { placeholder, value, items, onPress} = props;
  const item = items.find(item => {
    return (item['id'] || item['value']) == value
  })
  
  const key: string = item['name'] || placeholder;

  return(
    <ListItem
      key={key}
      title={key}
      chevron
      bottomDivider
      onPress={() => onPress(items, value)}
    />
  )
}

export default SelectBox;

