const authentication = {
  resolvers: {
    Mutation: {
      changeLoginStatus: (_, { logined }, { cache }) => {
        console.log("this is authentication resolver!!");
        console.log(cache);
        console.log(logined);
        cache.writeData({  data: { logined } });
        return null;
      },
    },
  },
  defaults: {
    logined: false,
  },
};

export default authentication;
