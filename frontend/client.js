import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import authentication from './src/graphql/resolvers/authentication';
import { createHttpLink } from 'apollo-link-http';
//import { onError } from 'apollo-link-error'

import { refreshTokenIfNecessary } from './src/utilities/firebase';
const uri = 'http://localhost:4000/api/graphiql';

const httpLink = createHttpLink({
  uri
});


const authLink = setContext(async (_, context) => {

  console.log(context)

  if (context.needAuth) {
    const token = await refreshTokenIfNecessary();

    return {
      headers: {
        ...context.headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  }
});


console.log(authentication);
const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
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
  }
});
const link = ApolloLink.from([stateLink, authLink, httpLink]);
const client = new ApolloClient({
  //link
  cache,
  link
});

export default client;
