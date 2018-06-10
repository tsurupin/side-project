import * as React from "react";
import { View, Text } from "react-native";
import { ProjectCore, UserCore } from "../../../../interfaces";
import ItemCard from "../ItemCard";
import styles from "./styles";

type Props = {
  items: UserCore[] | ProjectCore[];
  onPressCard: (id: string) => void;
};

const ItemList = (props: Props) => {
  const { onPressCard, items } = props;
  
  if (items.length === 0) {
    return (
      <View key={0}>
        <Text>No Users Found</Text>
      </View>
    );
  }

  return (
    <View>
      {items.map(item => {
        return (
          <ItemCard
            key={item.id}
            item={item}
            onPressCard={onPressCard}
          />
        )
      })}
    </View>
  );
};

export default ItemList;
