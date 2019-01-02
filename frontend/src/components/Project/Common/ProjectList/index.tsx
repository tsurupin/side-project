import * as React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { ProjectCore, Genre } from '../../../../interfaces';
import styles from './styles';
import { BACKGROUND_COLOR } from '../../../../constants/colors';

type Item = {
  id: string;
  title: string;
  status: string;
  genre: Genre | undefined;
  mainPhotoUrl: string | undefined;
};

type Props = {
  projects: ProjectCore[];
  onPress: (id: string, title: string) => void;
};

let onPress: any;
const keyExtractor = (item: ProjectCore, _: number) => item.id;

const renderProject = (data: any) => {
  const item: Item = data.item;


  const editing = item.status === 'EDITING';
  return (
    <ListItem
      title={editing ? `${item.title} (Editing)` : item.title}
      subtitle={item.genre ? item.genre.name : ''}
      // NOTE: needs to endure mainPhotoUrl is real image url
      // leftAvatar={{ source: { uri: item.mainPhotoUrl } }}
      chevron
      bottomDivider
      onPress={() => onPress(item.id, item.title)}
      containerStyle={styles.container}
      titleStyle={styles.title}
    />
  );
};

const ProjectList: React.SFC<Props> = (props) => {
  onPress = (id: string, title: string): void => props.onPress(id, title);
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={props.projects}
      renderItem={renderProject}
      endFillColor={BACKGROUND_COLOR}
    />
  );
};

export default ProjectList;
