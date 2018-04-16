import { ApolloProvider } from 'react-apollo';
import * as React from 'react';

import client from './client';


const apolloAndReduxProviderHOC = (WrappedComponent) => {

  class Enhance extends React.Component {
    render () {
      return (
        <ApolloProvider client={client}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
  return Enhance
};

export default apolloAndReduxProviderHOC;
