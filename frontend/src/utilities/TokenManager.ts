import { AsyncStorage } from 'react-native';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const EXPIRED_AT_IN_UNIX = 'EXPIRED_AT_IN_UNIX';
const TOKEN = 'TOKEN';

class TokenManager {
  token: string | undefined;
  expiredAtInUnix: number | undefined;
  observers: any[];

  constructor() {
    this.token = undefined;
    this.expiredAtInUnix = undefined;
    this.observers = [];
  }

  public registerObserver = (observer: any) => {
    this.observers.push(observer);
  };

  public removeToken = async () => {
    await AsyncStorage.removeItem(TOKEN);
    await AsyncStorage.removeItem(REFRESH_TOKEN);
    await AsyncStorage.removeItem(EXPIRED_AT_IN_UNIX);

    this.observers.forEach((observer) => {
      observer.watchToken(undefined);
    });
    this.expiredAtInUnix = undefined;
    this.token = undefined;
  };

  public setToken = async (token: string, refreshToken: string, validTimeInUnix: number = 3600) => {
    if (this.token && this.token === token) {
      return;
    }

    const expiredAtInUnix = validTimeInUnix + this.getCurrentTimeInUnix();
    await AsyncStorage.setItem(TOKEN, token);
    await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
    await AsyncStorage.setItem(EXPIRED_AT_IN_UNIX, `${expiredAtInUnix}`);
    this.observers.forEach((observer) => {
      observer.watchToken(token);
    });

    this.expiredAtInUnix = expiredAtInUnix;
    this.token = token;
  };

  private getCurrentTimeInUnix = (): number => {
    return Math.floor(Date.now() / 1000);
  };

  public getCachedToken = (): string | undefined => {
    if (!this.token) return undefined;

    if (this.expiredAtInUnix && this.expiredAtInUnix > this.getCurrentTimeInUnix()) {
      return this.token;
    } else {
      return undefined;
    }
  };

  public getToken = async (): Promise<string | undefined> => {
    const currentToken = await AsyncStorage.getItem(TOKEN);
    const expiredAtInUnix = await AsyncStorage.getItem(EXPIRED_AT_IN_UNIX);

    if (expiredAtInUnix && parseInt(expiredAtInUnix) > this.getCurrentTimeInUnix()) {
      if (!this.token) {
        this.token = currentToken;
        this.expiredAtInUnix = parseInt(expiredAtInUnix);
        this.observers.forEach((observer) => {
          observer.watchToken(this.token);
        });
      }
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
