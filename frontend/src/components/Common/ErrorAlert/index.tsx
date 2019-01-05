import * as React from 'react';
import { Alert } from 'react-native';

type Props = {
  message: string;
};

const ErrorAlert: React.SFC<Props> = ({ message }) => {
  return Alert.alert(message);
};

export default ErrorAlert;
