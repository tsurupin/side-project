import * as React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

type GraphQLError = {
  locations: any[];
  message: string;
  path: string[];
};
type Props = {
  graphQLErrors: GraphQLError[];
  message: string;
  networkError: string | undefined;
  extraInfo: string | undefined;
};

const ErrorMessage: React.SFC<Props> = (props) => {
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
