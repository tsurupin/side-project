import { Provider } from 'react-redux';

import { ApolloProvider } from 'react-apollo';
import * as React from 'react';

import client from './client';


const apolloAndReduxProviderHOC = (WrappedComponent) => {

  class Enhance extends React.Component {
    render () {
      return (
        <Provider>
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
