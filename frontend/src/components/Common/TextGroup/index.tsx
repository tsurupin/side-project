import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './styles';

interface Props {
  labelName: string;
  text: string | undefined;
}

const TextGroup: React.SFC<Props> = (props) => {
  const { labelName, text } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{labelName}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TextGroup;
