import * as React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

interface Props {
  title: string;
}

const SectionHeader: React.SFC<Props> = (props) => {
  const { title } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
};

export default SectionHeader;
