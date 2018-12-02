import * as React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

type Props = {
  title: string;
};

const SectionHeader: React.SFC<Props> = (props) => {
  const { title } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
};

export default SectionHeader;
