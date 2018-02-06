import { Provider } from 'react-redux';
// import { ApolloProvider } from 'react-apollo';
// import ApolloClient, { createNetworkInterface } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';

const uri = '/graphql';


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
    link: createHttpLink({ uri }),
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
