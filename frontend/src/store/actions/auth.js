
import { AsyncStorage } from 'react-native';
import { AUTH_SET_TOKEN } from './actionTypes';
import { startMainTabs } from '../../screens/MainTabs/MainTabs';
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


export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken)
    .then(() => {
      startMainTabs();
    })
    .catch(err => console.log("Failed to fetch token!!"))
  }
};
