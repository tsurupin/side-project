import firebase from 'firebase';
import {
  AsyncStorage
} from 'react-native';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID
} from '../../config';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID
}
firebase.initializeApp(firebaseConfig);

export const firebaseSignIn = (token) => {
  return new Promise((resolve, reject) =>{
    firebase.auth().signInWithCustomToken(token)
    .then(result => {
      result.getIdToken(false).then(async (idToken) => {
        console.log(token);
        await AsyncStorage.setItem("token", idToken);
        const currentTimeInUnix = Math.floor(Date.now() / 1000);
        const expiredAtInUnix = `${3600 + currentTimeInUnix}`;
        await AsyncStorage.setItem("refreshToken", result.refreshToken);
        await AsyncStorage.setItem("expiredAtInUnix", expiredAtInUnix);
        resolve();
      })
    }).catch(error => {
      console.log(error)
      reject();
    })
  })
};

export const firebaseSignOut = () => {
  firebase.auth().signOut().then(async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('expiredAtInUnix');
  }).catch(error => console.log(error))
};

export const refreshTokenIfNecessary = async () => {
  const currentToken = await AsyncStorage.getItem('token');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const expiredAtInUnix = await AsyncStorage.getItem('expiredAtInUnix');

  const currentTimeInUnix = Math.floor(Date.now() / 1000);
  console.log(currentToken)

  if (!expiredAtInUnix || parseInt(expiredAtInUnix) > currentTimeInUnix) { return currentToken };
  if (!refreshToken) { return };

  const config = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken
    })
  };

  const result = await fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`, config)
  .then(result => result.json())
  .then(async(result) => {
     const token = result.id_token;
     console.log('refreshed')
     await AsyncStorage.setItem("token", token);
     await AsyncStorage.setItem("refreshToken", result.refresh_token);
     const nextExpiredAtInUnix = `${parseInt(result.expires_in) + currentTimeInUnix}`;
     await AsyncStorage.setItem("expiredAt", nextExpiredAtInUnix);
     return token;
   })
   .catch(error => console.log(error))
   return result;
};
