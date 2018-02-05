import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import configureStore from './src/store/configureStore';
const store = configureStore();

export default const apolloAndReduxProviderHOC = (WrappedComponent, store, client) => {
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
