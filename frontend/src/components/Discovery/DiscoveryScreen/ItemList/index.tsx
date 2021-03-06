import * as React from 'react';
import { View, Text } from 'react-native';
import { ProjectCore, UserCore } from '../../../../interfaces';
import UserCard from '../UserCard';
import ProjectCard from '../ProjectCard';

import styles from './styles';

type Item = UserCore | ProjectCore;
type Props = {
  type: string;
  items: Item[];
  onPressCard: (id: string, title: string) => void;
};

const renderItem = (type: string, item: Item, fnc: (id: string) => void) => {
  if (type === 'User') {
    const user = item as UserCore;
    return <UserCard key={item.id} user={user} onPressCard={fnc} />;
  }
  const project = item as ProjectCore;
  return <ProjectCard key={project.id} project={project} onPressCard={fnc} />;
};

const ItemList: React.SFC<Props> = (props) => {
  const { onPressCard, items, type } = props;

  if (items.length === 0) {
    return (
      <View key={0} style={styles.blankContainer}>
        <Text style={styles.text}>{`No ${type} Found`}</Text>
      </View>
    );
  }

  return <View style={styles.container}>{items.map((item) => renderItem(type, item, onPressCard))}</View>;
};

export default ItemList;
