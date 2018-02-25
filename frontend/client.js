import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
import resolvers from './graphql/resolvers';
import { createHttpLink } from 'apollo-link-http';

//import { onError } from 'apollo-link-error'

import { refreshTokenIfNecessary } from './src/utilities/firebase';
const uri = 'http://localhost:4000/api/graphiql';

const httpLink = createHttpLink({
  uri
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
  resolvers,
  defaults: {}
});
const link = ApolloLink.from([stateLink, authLink, httpLink]);
const client = new ApolloClient({
  link,
  cache
});

export default client;
