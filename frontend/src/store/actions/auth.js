
import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN } from './actionTypes';
export const tryAuth = () => {
  return dispatch => {
    dispatch(authSignup())
  }
};

const authSignup = () => {
  return {
    type: AUTH_SET_TOKEN
  }
};
