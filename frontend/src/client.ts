import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloLink, split } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
//import authentication from './src/graphql/resolvers/authentication';
import { createHttpLink } from "apollo-link-http";
import { createUploadLink } from '@richeterre/apollo-upload-client'

import { onError } from "apollo-link-error";
//import Retry from 'apollo-link-retry';
import TokenManager from "./utilities/tokenManager";
import AbsintheSocketLink from "./utilities/absintheSocketLink";
import { firebaseRefreshToken } from "./utilities/firebase";
import { getMainDefinition } from "apollo-utilities";
// import { observe, notifier, create } from "@absinthe/socket";
// import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
// import { Socket as PhoenixSocket } from "phoenix";
import { MATCH_LIST_QUERY } from "./graphql/matches";
const uri = "http://localhost:4000/api/graphiql";

// const absintheSocket = create(new PhoenixSocket("ws://localhost:4000/socket/websocket?vsn=2.0.0",{params: { token: 'my-token' }}));
// // how to params asynchronouslly
// const bsintheSocketLink = createAbsintheSocketLink(absintheSocket);

// const httpLink = createHttpLink({
//   uri,
//   credentials: "include"
//   //credentials: process.env.NODE_ENV === 'development' ? 'include' : 'same-origin'
// });

const uploadLink = createUploadLink({
  uri,
  credentials: "include"
})
// const client = new ApolloClient({
//   link: createLink({
//       uri: "/graphql"
//   }),
//   headers,
// });

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
        return;
      },
      updateUserSearchParams: (prev, data, { cache}) => {
        console.log("update", prev, data);
        // cache.writeData({data: { }})
        return;
      }
    }
  },
  defaults: {
    logined: false,
    userSearchParams: {genreId: undefined, occupationTypeId: undefined, isActive: false, skills: [],location: {}}
  }
});

const link = split(
  ({ query }: any) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  AbsintheSocketLink,
  ApolloLink.from([stateLink, errorLink, authLink, uploadLink])
);

const client = new ApolloClient({
  cache,
  link
});

export default client;
