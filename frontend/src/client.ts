import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloLink, split } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
//import authentication from './src/graphql/resolvers/authentication';
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
//import Retry from 'apollo-link-retry';
import { refreshTokenIfNecessary } from "./utilities/firebase";
import { getMainDefinition } from "apollo-utilities";
import { observe, notifier, create } from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";
import { MATCH_LIST_QUERY } from "./graphql/matches";
const uri = "http://localhost:4000/api/graphiql";

const httpLink = createHttpLink({
  uri,
  credentials: "include"
  //credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin'
});
//https://medium.com/nuu-engineering/how-to-integrate-elixir-absinthe-graphql-with-react-apollo-without-dying-in-the-attempt-2b5c1cc59577
const absintheSocket = create(new PhoenixSocket("ws://localhost:4000/socket/websocket?vsn=2.0.0",{params: { token: 'my-token' }}));
// how to params asynchronouslly
const absintheSocketLink = createAbsintheSocketLink(absintheSocket);


const errorLink = onError(err => {
  console.log("apollo-link-error, err", err);
});

const authLink = setContext(async (_, context) => {
  if (!context.needAuth) return;

  console.log("authorization");
  try {
    const token = await refreshTokenIfNecessary();

    return {
      headers: {
        ...context.headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  } catch (e) {
    console.log("error raised", e);
    return e;
  }
});

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers: {
    Query: {
      users: (hoge1, hoge2, _) => {
        console.warn("user resolvers")

      }
    },
    Mutation: {
      changeLoginStatus: (_, { logined }, { cache }) => {
        console.warn("changeLoginStatus")
        cache.writeData({ data: { logined } });
        return null;
      }
    }
  },
  defaults: {
    logined: false
  }
});

const link = split(
  ({ query }: any) => {
    const { kind, operation }: any = getMainDefinition(query);
    console.log(kind, operation)
    console.log(query)
    return kind === "OperationDefinition" && operation === "subscription";
  },
  absintheSocketLink,
  ApolloLink.from([stateLink, errorLink, authLink, httpLink])
);
console.log("link", link)
const client = new ApolloClient({
  cache,
  link
});

export default client;
