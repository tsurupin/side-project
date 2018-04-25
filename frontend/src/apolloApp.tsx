import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './client';


const ApolloApp = AppComponent => {
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
};

export default ApolloApp;
