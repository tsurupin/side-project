import * as React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { BackgroundColor } from '../../../../constants/colors';
import { ProjectCore } from '../../../../interfaces';
import styles from './styles';

interface Props {
  projects: ProjectCore[];
  onPress: (id: string) => void;
}

let onPress;
const keyExtractor = (_item, index) => index;

const renderProject = ({ item }) => {

  const editing = item.status === 'EDITING';
  return (
    <ListItem
      title={editing ? `${item.title} (Editing)` : item.title}
      subtitle={item.genre ? item.genre.name : ''}
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
