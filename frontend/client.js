import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink, split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import authentication from './src/graphql/resolvers/authentication';
import { createHttpLink } from 'apollo-link-http';
//import { onError } from 'apollo-link-error'
import Retry from 'apollo-link-retry';
import { refreshTokenIfNecessary } from './src/utilities/firebase';
import { getMainDefinition } from 'apollo-utilities';
import absintheSocketLink from "./absinthe-socket-link";

const uri = 'http://localhost:4000/api/graphiql';

const httpLink = createHttpLink({
  uri,

  credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin'
});


const authLink = setContext(async (_, context) => {

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
const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  absintheSocketLink,
  ApolloLink.from([stateLink, authLink, httpLink])
);

//const link = ApolloLink.from([stateLink, authLink, httpLink]);
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([absintheSocketLink, stateLink, authLink, httpLink])
});

export default client;
