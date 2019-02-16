import * as firebase from 'firebase';
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID } from '../config';
import TokenManager from './TokenManager';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID
};
firebase.initializeApp(firebaseConfig);

const FIREBASE_TOKEN_URL = 'https://securetoken.googleapis.com/v1/token';

export const firebaseSignIn = (firebaseToken: string) => {
  return new Promise((resolve, reject) => {
    console.log(firebaseConfig);
    try {
      firebase
        .auth()
        .signInWithCustomToken(firebaseToken)
        .then((result) => {
          console.log(result);
          const { user } = result;
          console.log('user', user);

          if (!user) return reject('not found user');

          user.getIdToken(false).then(async (userToken) => {
            console.log('ger token');
            await TokenManager.setToken(userToken, user.refreshToken);
            resolve();
          });
        })
        .catch((error) => {
          console.log('signInError', error);
          reject();
        });
    } catch (e) {
      console.log('error', e);
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
