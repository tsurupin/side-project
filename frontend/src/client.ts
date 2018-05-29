import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloLink, split } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
//import authentication from './src/graphql/resolvers/authentication';
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
//import Retry from 'apollo-link-retry';
import TokenManager from "./utilities/tokenManager";
import absintheSocketLink from "./utilities/absintheSocketLink";
import { firebaseRefreshToken } from "./utilities/firebase";
import { getMainDefinition } from "apollo-utilities";

import { MATCH_LIST_QUERY } from "./graphql/matches";
const uri = "http://localhost:4000/api/graphiql";

const httpLink = createHttpLink({
  uri,
  credentials: "include"
  //credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin'
});

const errorLink = onError(err => {
  console.log("apollo-link-error, err", err);
});

const authLink = setContext(async (_, context) => {
  if (!context.needAuth) return;

  console.log("authorization");
  try {
    let token = await TokenManager.getToken();
    if (!token) {
      token = await firebaseRefreshToken();
    }

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
        console.warn("user resolvers");
      }
    },
    Mutation: {
      changeLoginStatus: (prev, { logined }, { cache }) => {
        console.log("mutation", prev, logined);
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
    return kind === "OperationDefinition" && operation === "subscription";
  },
  absintheSocketLink,
  ApolloLink.from([stateLink, errorLink, authLink, httpLink])
);

const client = new ApolloClient({
  cache,
  link
});

export default client;
