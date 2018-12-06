import * as React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import { GraphQLErrorMessage } from '../../../interfaces';

const ErrorMessage: React.SFC<GraphQLErrorMessage> = (props: GraphQLErrorMessage) => {
  const { graphQLErrors, message, networkError, extraInfo } = props;
  console.info(graphQLErrors, message, networkError, extraInfo);
  const errorMessage = graphQLErrors[0].message;
  return (
    <View>
      <Text style={styles.text}>{errorMessage}</Text>
    </View>
  );
};

export default ErrorMessage;
