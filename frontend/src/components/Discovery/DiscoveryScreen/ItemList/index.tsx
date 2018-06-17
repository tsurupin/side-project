import * as React from "react";
import { View, Text } from "react-native";
import { ProjectCore, UserCore } from "../../../../interfaces";
import UserCard from "../UserCard";
import ProjectCard from "../ProjectCard";
import styles from "./styles";

type Item = UserCore | ProjectCore
type Props = {
  type: string
  items: Item[];
  onPressCard: (id: string) => void;
};


const renderItem = (type: string, item: Item, fnc) => {
  if (type === "User") {
    const user = item as UserCore;
    return (
      <UserCard
      key={item.id}
      user={user}
      onPressCard={fnc}
    />
    )
  } else {
    const project = item as ProjectCore;
    return (
      <ProjectCard
      key={project.id}
      project={project}
      onPressCard={fnc}
    />
    )
  }
}

const ItemList = (props: Props) => {
  const { onPressCard, items, type } = props;
  
  if (items.length === 0) {
    return (
      <View key={0}>
        <Text>{`No ${type} Found`}</Text>
      </View>
    );
  }

  return (
    <View>
      {items.map(item => renderItem(type, item, onPressCard))}
    </View>
  );
};

export default ItemList;
