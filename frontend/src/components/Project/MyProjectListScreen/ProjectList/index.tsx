import * as React from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";

import { ProjectCore } from "../../../../interfaces";
import styles from "./styles";
import { BackgroundColor } from "../../../../constants/colors";

type Props = {
  projects: ProjectCore[];
  onPress: (id: string) => void;
};

let onPress;
const keyExtractor = (_item, index) => index;

const renderProject = ({ item }) => {
  return (
    <ListItem
      title={item.title}
      subtitle={item.genre ? item.genre.name : ""}
      leftAvatar={{ source: { uri: item.main_photo_url } }}
      chevron
      bottomDivider
      onPress={() => onPress(item.id)}
      containerStyle={styles.container}
      titleStyle={styles.title}
    />
  );
};

const ProjectList: React.SFC<Props> = (props) => {
  onPress = (id) => props.onPress(id);
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={props.projects}
      renderItem={renderProject}
      endFillColor={BackgroundColor}
     
    />
  );
};

export default ProjectList;
