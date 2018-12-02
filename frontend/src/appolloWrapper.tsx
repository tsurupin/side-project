import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './client';

const ApolloWrapper = AppComponent => {
  class Enhance extends React.Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <AppComponent {...this.props} />
        </ApolloProvider>
      );
    }
  }
  return Enhance;
};

export default ApolloWrapper;
