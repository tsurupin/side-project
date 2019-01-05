import * as React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

type Props = {
  message: string;
};

const ErrorMessage: React.SFC<Props> = (props) => {
  return (
    <View>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
};

export default ErrorMessage;
