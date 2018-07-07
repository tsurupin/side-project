const changeLoginStatus = (_, { logined }, { cache }) => {
  cache.writeData({ data: { logined } });
  return null;
};

export { changeLoginStatus };
