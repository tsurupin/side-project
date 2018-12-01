import * as React from 'react';
import { Alert } from 'react-native';

const ErrorAlert = (message: string) => {
  return Alert.alert(message);
};

export default ErrorAlert;
