const changeLoginStatus = (_, { logined }, { cache }) => {
  console.log("changeloginc")
  cache.writeData({ data: { logined } });
  return null;
};

export { changeLoginStatus };
