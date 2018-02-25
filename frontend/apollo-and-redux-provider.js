import { Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import React, { Component } from 'react';
// import { setContext } from 'apollo-link-context';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { AsyncStorage } from 'react-native';
// import { ApolloLink } from 'apollo-link';
// import { ApolloClient } from 'apollo-client';
// import { withClientState } from 'apollo-link-state';
// import resolvers from './graphql/resolvers';
// import { createHttpLink } from 'apollo-link-http';
// import { onError } from 'apollo-link-error'
//
// import { refreshTokenIfNecessary } from './src/utilities/firebase';
// import { refreshTokenQuery } from './src/graphql/queries';
// const uri = 'http://localhost:4000/api/graphiql';
//
// const httpLink = createHttpLink({
//   uri
// });
import client from './client';


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
