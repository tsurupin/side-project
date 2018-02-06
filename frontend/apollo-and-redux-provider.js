import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'react-apollo';

const uri = '/graphql';


const apolloAndReduxProviderHOC = (WrappedComponent, store) => {
  const networkInterface = createNetworkInterface({
    uri,
    opts: {
           credentials: 'same-origin',
           mode: 'cors'
       }
  });
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
    networkInterface,
    dataIdFromObject: r => r.id
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
