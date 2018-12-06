import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID } from '../config';
import TokenManager from './TokenManager';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID
};
firebase.initializeApp(firebaseConfig);

const REFRESH_TOKEN = 'REFRESH_TOKEN';
const EXPIRED_AT_IN_UNIX = 'EXPIRED_AT_IN_UNIX';
const TOKEN = 'TOKEN';
const FIREBASE_TOKEN_URL = 'https://securetoken.googleapis.com/v1/token';

export const firebaseSignIn = (firebaseToken) => {
  console.log('before FB signIn');

  return new Promise((resolve, reject) => {
    try {
      console.log('firebase before auth');
      firebase
        .auth()
        .signInWithCustomToken(firebaseToken)
        .then((result) => {
          console.log(result);
          const { user } = result;

          if (!user) return reject('not found user');

          user.getIdToken(false).then(async (userToken) => {
            await TokenManager.setToken(userToken, user.refreshToken);
            resolve();
          });
        })
        .catch((error) => {
          console.log('signInError', error);
          reject();
        });
    } catch (e) {
      console.log(e);
      resolve();
    }
  });
};

export const firebaseSignOut = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await TokenManager.removeToken();
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};

export const firebaseRefreshToken = async () => {
  const refreshToken = await TokenManager.getRefreshToken();

  if (!refreshToken) {
    return;
  }

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  };

  const result = await fetch(`${FIREBASE_TOKEN_URL}?key=${FIREBASE_API_KEY}`, config)
    .then((result) => result.json())
    .then(async (result) => {
      const token = result.id_token;
      await TokenManager.setToken(token, result.refresh_token, parseInt(result.expires_in));

      return token;
    })
    .catch((error) => console.log(error));
  return result;
};
