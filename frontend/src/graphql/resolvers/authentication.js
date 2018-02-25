const authentication = {
  defaults: {
    logined: false,
  },
  resolvers: {
    Mutation: {
      changeLoginStatus: (_, { logined }, { cache }) => {
        cache.writeData({ data: { logined } });
        return null;
      },
    },
  },
};

export default authentication;
