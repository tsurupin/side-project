import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID
} from "../config";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID
};
firebase.initializeApp(firebaseConfig);

const REFRESH_TOKEN = "REFRESH_TOKEN";
const EXPIRED_AT_IN_UNIX = "EXPIRED_AT_IN_UNIX";
const TOKEN = "TOKEN";

export const firebaseSignIn = firebaseToken => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithCustomToken(firebaseToken)
      .then(result => {
        const { user } = result;
 
        user.getIdToken(false).then(async userToken => {
    
          await AsyncStorage.setItem(TOKEN, userToken);
          const currentTimeInUnix = Math.floor(Date.now() / 1000);
          const expiredAtInUnix = `${3600 + currentTimeInUnix}`;
          await AsyncStorage.setItem(REFRESH_TOKEN, user.refreshToken);
          await AsyncStorage.setItem(EXPIRED_AT_IN_UNIX, expiredAtInUnix);
          resolve();
        });
      })
      .catch(error => {
        console.log("signInError", error);
        reject();
      });
  });
};

export const firebaseSignOut = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem(TOKEN);
        await AsyncStorage.removeItem(REFRESH_TOKEN);
        await AsyncStorage.removeItem(EXPIRED_AT_IN_UNIX);
        resolve();
      })
      .catch(error => {
        console.log(error);
        reject();
      });
  });
};

const activeToken = async (): Promise<string | undefined> => {
  const currentToken = await AsyncStorage.getItem(TOKEN);
  const expiredAtInUnix = await AsyncStorage.getItem(EXPIRED_AT_IN_UNIX);
  
  const currentTimeInUnix = Math.floor(Date.now() / 1000);

  if (expiredAtInUnix && parseInt(expiredAtInUnix) > currentTimeInUnix) {
    return currentToken;
  }
  return undefined;
};

export const hasActiveToken = async () => {
  const token = await activeToken();
  return token ? true : false;
};

export const refreshTokenIfNecessary = async () => {
  const token = await activeToken();
  if (token) {
    return token;
  }

  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
  const currentTimeInUnix = Math.floor(Date.now() / 1000);

  if (!refreshToken) {
    return;
  }

  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken
    })
  };

  const result = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
    config
  )
    .then(result => result.json())
    .then(async result => {
      const token = result.id_token;
      console.log("refreshed");
      await AsyncStorage.setItem(TOKEN, token);
      await AsyncStorage.setItem(REFRESH_TOKEN, result.refresh_token);
      const nextExpiredAtInUnix = `${parseInt(result.expires_in) +
        currentTimeInUnix}`;
      await AsyncStorage.setItem(EXPIRED_AT_IN_UNIX, nextExpiredAtInUnix);
      return token;
    })
    .catch(error => console.log(error));
  return result;
};
