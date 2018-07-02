import * as React from "react";
import { ListItem } from "react-native-elements";
import styles from "./styles";


type Props = {
  keyName: string;
  placeholder: string;
  value: string | number | undefined;
  items: any[],
  onPress: (items: any[], key: string, selectedValue: string | number | undefined) => void;
}

const SelectBox = (props: Props) => {
  console.log(props);
  const { placeholder, value, items, keyName, onPress} = props;
  const item = items.find(item => {
    return (item['id'] || item['value']) == value
  })

  const title: string = item['name'] || placeholder;

  return(
    <ListItem
      key={title}
      title={title}
      chevron
      bottomDivider
      onPress={() => onPress(items, keyName, value)}
    />
  )
}

export default SelectBox;

