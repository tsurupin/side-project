import { AsyncStorage } from "react-native";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const EXPIRED_AT_IN_UNIX = "EXPIRED_AT_IN_UNIX";
const TOKEN = "TOKEN";

class TokenManager {
  token: string | undefined;
  observers: any[];

  constructor() {
    this.token = undefined;
    this.observers = [];
  }

  public registerObserver = (observer: any) => {
    this.observers.push(observer);
  };

  // public removeObserver = (observer: any) => {
  //   this.observers = this.observers.filter(tempObserver => observer != tempObserver);
  // }

  public removeToken = async () => {
    await AsyncStorage.removeItem(TOKEN);
    await AsyncStorage.removeItem(REFRESH_TOKEN);
    await AsyncStorage.removeItem(EXPIRED_AT_IN_UNIX);

    this.observers.forEach(observer => observer.watchToken(undefined));
    this.token = undefined;
  
  };

  public setToken = async (
    token: string,
    refreshToken: string,
    validTimeInUnix: number = 3600
  ) => {
    const currentTimeInUnix = Math.floor(Date.now() / 1000);
    const expiredAtInUnix = `${validTimeInUnix + currentTimeInUnix}`;
    await AsyncStorage.setItem(TOKEN, token);
    await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
    await AsyncStorage.setItem(EXPIRED_AT_IN_UNIX, expiredAtInUnix);
    this.observers.forEach(observer => {
      console.log("setToken", observer)
      observer.watchToken(token)
    });
    this.token = token;
  };

  public getToken = async (): Promise<string | undefined> => {
    const currentToken = await AsyncStorage.getItem(TOKEN);
    const expiredAtInUnix = await AsyncStorage.getItem(EXPIRED_AT_IN_UNIX);

    const currentTimeInUnix = Math.floor(Date.now() / 1000);

    if (expiredAtInUnix && parseInt(expiredAtInUnix) > currentTimeInUnix) {
      return currentToken;
    }
    return undefined;
  };

  public getRefreshToken = async (): Promise<string | undefined> => {
    return await AsyncStorage.getItem(REFRESH_TOKEN);
  };

  public hasActiveToken = async (): Promise<boolean> => {
    const token = await this.getToken();
    return token ? true : false;
  };
}

export default new TokenManager();
