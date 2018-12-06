import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from './client';

const ApolloWrapper = (AppComponent: any) => {
  return class extends React.Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <AppComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};

export default ApolloWrapper;
