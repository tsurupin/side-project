import { Provider } from 'react-redux';

import { ApolloProvider, graphql } from 'react-apollo';
import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';
import { onError } from 'apollo-link-error'
import firebase from 'firebase';

const uri = 'http://localhost:4000/api/graphiql';

const httpLink = createHttpLink({
  uri
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('token');

  console.log("authLink")
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const errorLink = onError(({ networkError, graphQLErrors }) => {
  console.log(networkError)
  console.log(graphQLErrors)
  console.log("error Link")
  if (networkError.statusCode === 403 && networkError.message == "token is expired") {
    client.query({
      query: qql`
        query RefreshToken {
          refresh {
            token
          }
        }
      `,
    }).then( result => {
      const token = result.data.refresh.token;
      console.log(token)

      firebase.auth().signInWithCustomToken(token)
      .then(result => {
        result.getIdToken(false).then(async (idToken) => {
          console.log(idToken);
          await AsyncStorage.setItem("token", idToken);
        })
      })
    }).catch(error => console.log(error))
  }
})
//https://github.com/apollographql/apollo-client/issues/1784

const client = new ApolloClient({
  link: [httpLink, authLink, errorLink],
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
