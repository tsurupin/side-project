import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloLink, split } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { withClientState } from "apollo-link-state";
//import authentication from './src/graphql/resolvers/authentication';
import { createHttpLink } from "apollo-link-http";
import { createUploadLink } from "@richeterre/apollo-upload-client";

import { onError } from "apollo-link-error";
//import Retry from 'apollo-link-retry';
import TokenManager from "./utilities/tokenManager";
import AbsintheSocketLink from "./utilities/absintheSocketLink";
import { firebaseRefreshToken } from "./utilities/firebase";
import { getMainDefinition } from "apollo-utilities";
import { USER_SEARCH_PARAMS_QUERY } from "./graphql/users";
import { PROJECT_SEARCH_PARAMS_QUERY } from "./graphql/projects";
const uri = "http://localhost:4000/api/graphiql";

const uploadLink = createUploadLink({
  uri,
  credentials: "include"
});
// const client = new ApolloClient({
//   link: createLink({
//       uri: "/graphql"
//   }),
//   headers,
// });

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

        cache.writeData({ data: { logined } });
        return null;
      },
      updateUserSearchParams: (prev, { userSearchParams }, { cache }) => {
        let data = cache.readQuery({ query: USER_SEARCH_PARAMS_QUERY });
        for (let [k, v] of Object.entries(userSearchParams)) {
          if (k === "location") {
            data.userSearchParams[k] = { ...data.userSearchParams[k], ...v };
          } else {
            data.userSearchParams[k] = v;
          }
        }
        cache.writeQuery({
          query: USER_SEARCH_PARAMS_QUERY,
          data: {
            userSearchParams: data.userSearchParams
          }
        });

        return null;
      },
      updateProjectSearchParams: (prev, { projectSearchParams }, { cache }) => {
        let data = cache.readQuery({ query: PROJECT_SEARCH_PARAMS_QUERY });
       
        for (let [k, v] of Object.entries(projectSearchParams)) {
          if (k === "city") {
        
            data.projectSearchParams[k] = {
              ...data.projectSearchParams[k],
              ...v
            };
          } else {
            data.projectSearchParams[k] = v;
          }
        }
        cache.writeQuery({
          query: PROJECT_SEARCH_PARAMS_QUERY,
          data: {
            projectSearchParams: data.projectSearchParams
          }
        });

        return null;
      }
    }
  },
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
      city: { __typename: "ProjectSearchParamsCity", id: null, fullName: null }
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
