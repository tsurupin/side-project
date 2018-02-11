import { Provider } from 'react-redux';

import { ApolloProvider, graphql } from 'react-apollo';
import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const uri = 'http://localhost:4000/api/graphiql';

const apolloAndReduxProviderHOC = (WrappedComponent, store) => {
  // const networkInterface = createNetworkInterface({
  //   uri,
  //   opts: {
  //          credentials: 'same-origin',
  //          mode: 'cors'
  //      }
  // });


  //
  // networkInterface.use([{
  //      async applyMiddleware(req, next) {
  //          try {
  //              if (!req.options.headers) req.options.headers = {}
  //              const token = await AsyncStorage.getItem('token')
  //              req.options.headers.authorization = token || null
  //              next()
  //          } catch (error) {
  //              next()
  //          }
  //      }
  //  }])

  const client = new ApolloClient({
    link: new HttpLink({ uri }),
    cache: new InMemoryCache(),
  });

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
