import { Provider } from 'react-redux';

import { ApolloProvider, graphql } from 'react-apollo';
import React, { Component } from 'react';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import Retry from 'apollo-link-retry';
import { onError } from 'apollo-link-error'

import { refreshTokenIfNecessary } from './src/utilities/firebase';
import { refreshTokenQuery } from './src/graphql/queries';
const uri = 'http://localhost:4000/api/graphiql';

const httpLink = createHttpLink({
  uri
});

const authLink = setContext(async (_, context) => {

  if (context.needAuth) {
    const token = await refreshTokenIfNecessary();
    console.log(token);

    return {
      headers: {
        ...context.headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  }
});

const errorLink = onError(async({ networkError, graphQLErrors }) => {
  if (graphQLErrors.length > 0 && graphQLErrors[0].message === "token expired") {

  }

})

const client = new ApolloClient({
  link: authLink.concat(errorLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

const apolloAndReduxProviderHOC = (WrappedComponent, store) => {

  class Enhance extends React.Component {
    render () {
      return (
        <Provider store={store}>
          <ApolloProvider client={client}>
            <WrappedComponent {...this.props} />
          </ApolloProvider>
        </Provider>
      )
    }
  }
  return Enhance
};

export default apolloAndReduxProviderHOC;
