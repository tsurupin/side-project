import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';

type Props = {
  color?: string;
};

const LoadingIndicator: React.SFC<Props> = ({ color }) => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color={color} />
      </View>
    </View>
  );
};

LoadingIndicator.defaultProps = {
  color: '#0000ff'
};

export default LoadingIndicator;
