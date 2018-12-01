import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

interface GraphQLError {
  locations: any[];
  message: string;
  path: string[];
}
interface Props {
  graphQLErrors: GraphQLError[];
  message: string;
  networkError: string | undefined;
  extraInfo: string | undefined;
}

const ErrorMessage: React.SFC<Props> = (props) => {
  const { graphQLErrors, message, networkError, extraInfo } = props;
  console.info(graphQLErrors, message, networkError, extraInfo);
  const errorMessage = graphQLErrors[0].message;
  return (
    <View>
      <Text>{errorMessage}</Text>
    </View>
  );
};

export default ErrorMessage;
