import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import client from './client';
const apolloAndReduxProviderHOC = (WrappedComponent, store) => {
    class Enhance extends React.Component {
        render() {
            return (<Provider store={store}>
          <ApolloProvider client={client}>
            <WrappedComponent {...this.props}/>
          </ApolloProvider>
        </Provider>);
        }
    }
    return Enhance;
};
export default apolloAndReduxProviderHOC;
//# sourceMappingURL=apollo-and-redux-provider.js.map