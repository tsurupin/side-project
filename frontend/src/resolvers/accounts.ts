type LoginData = {
  logined: boolean;
};

type CacheData = {
  cache: any;
};

const changeLoginStatus = (_: any, { logined }: LoginData, { cache }: CacheData) => {
  cache.writeData({ data: { logined } });
  return null;
};

export { changeLoginStatus };
