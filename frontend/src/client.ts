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

const uri = "http://localhost:4000/api/graphiql";



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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
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
        console.log("mutation", prev, logined);
        cache.writeData({ data: { logined } });
        return null;
      },
      updateUserSearchParams: (prev, {userSearchParams}, { cache}) => {
        console.log("update", prev, userSearchParams, cache);
        const params = {
          __typename: "UserSearchParams",
          genreId: userSearchParams.genreId,
          occupationTypeId: userSearchParams.occupationTypeId,
          isActive: userSearchParams.isActive,
          skills: userSearchParams.skills,
          location: {...userSearchParams.location, __typename: "UserSearchParamsLocation"}
        }
        console.log(params)
        cache.writeData({data: {userSearchParams: params}})
        return null;
      },
      updateProjectSearchParams: (prev, {projectSearchParams}, { cache }) => {
        
        const params = {
          __typename: "ProjectSearchParams",
          genreId: projectSearchParams.genreId,
          city:  {...projectSearchParams.city, __typename: "ProjectSearchParamsCity"},
          skills: projectSearchParams.skills
        }

        cache.writeData({data: {projectSearchParams: params}})
        return null;
      }
    }
  },
  defaults: {
    logined: false,
    userSearchParams: {
      __typename: "UserSearchParams",
      genreId: null, occupationTypeId: null, isActive: false, skills: [],location: {__typename: "UserSearchParamsLocation"}
    },
    projectSearchParams: {
      __typename: "ProjectSearchParams",
      genreId: null, skills: [], city: {__typename: "ProjectSearchParamsCity"}
    }
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
