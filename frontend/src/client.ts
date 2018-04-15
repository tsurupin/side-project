import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloLink, split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';
//import authentication from './src/graphql/resolvers/authentication';
import { createHttpLink } from 'apollo-link-http';
//import { onError } from 'apollo-link-error'
//import Retry from 'apollo-link-retry';
import { refreshTokenIfNecessary } from './utilities/firebase';
import { getMainDefinition } from 'apollo-utilities';
import * as AbsintheSocket from "@absinthe/socket";
import {createAbsintheSocketLink} from "@absinthe/socket-apollo-link";
import {Socket as PhoenixSocket} from "phoenix";


const uri = 'http://localhost:4000/api/graphiql';

const httpLink = createHttpLink({
  uri
  //credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin'
});

const absintheSocketLink = createAbsintheSocketLink(AbsintheSocket.create(
  new PhoenixSocket("ws://localhost:4000/socket")
));

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
  ({ query }: any) => {
    const { kind, operation }:any = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  absintheSocketLink,
  ApolloLink.from([stateLink, authLink, httpLink])
);

const client = new ApolloClient({
  cache,
  link
});

export default client;
