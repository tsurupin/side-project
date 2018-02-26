import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import authentication from './src/graphql/resolvers/authentication';
import { createHttpLink } from 'apollo-link-http';
//import { onError } from 'apollo-link-error'
import Retry from 'apollo-link-retry';
import { refreshTokenIfNecessary } from './src/utilities/firebase';
import absintheSocketLink from "./absinthe-socket-link";

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
        cache.writeData({  data: { logined } });
        return null;
      },
    },
  },
  defaults: {
    logined: false,
  }
});
const link = new Retry().split(
  (operation) => {
    console.log(operation);
    console.log(operation.getContext());
    return ApolloLink.from([absintheSocketLink, stateLink, authLink, httpLink]);
    //operation..getContext()
  }
);
//const link = ApolloLink.from([stateLink, authLink, httpLink]);
const client = new ApolloClient({
  //link
  cache,
  link
});

export default client;
