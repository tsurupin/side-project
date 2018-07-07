import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloLink, split } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
import { accountMutation }   from './src/graphql/resolvers/mutations';
import { createHttpLink } from "apollo-link-http";
import { createUploadLink } from "@richeterre/apollo-upload-client";

import { onError } from "apollo-link-error";
//import Retry from 'apollo-link-retry';
import TokenManager from "./utilities/tokenManager";
import AbsintheSocketLink from "./utilities/absintheSocketLink";
import { firebaseRefreshToken } from "./utilities/firebase";
import { getMainDefinition } from "apollo-utilities";
import resolvers from "./resolvers";

const uri = "http://localhost:4000/api/graphiql";

const uploadLink = createUploadLink({
  uri,
  credentials: "include"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, context) => {
  if (!context.needAuth) return;

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
  resolvers,
  defaults: {
    logined: false,
    userSearchParams: {
      __typename: "UserSearchParams",
      genreId: null,
      occupationTypeId: null,
      isActive: false,
      skills: [],
      location: {
        __typename: "UserSearchParamsLocation",
        latitude: null,
        longitude: null,
        distance: null
      }
    },
    projectSearchParams: {
      __typename: "ProjectSearchParams",
      genreId: null,
      skills: [],
      city: { 
        __typename: "ProjectSearchParamsCity", 
        id: null, 
        fullName: null 
      }
    }
  },
  typeDefs: `
    type Skill {
      id: ID!
      name: String!
    }
    type Location {
      latitude: Float!
      longitude: Float!
      distance: Int!
    }
    type City {
      id: ID!
      fullName: String!
    }
  `
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
