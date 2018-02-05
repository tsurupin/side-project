import { Navigation } from 'react-native-navigation';
import ApolloAndReduxProvider from './apollo-and-reduc-provider';
import {
  AUTH_SCREEN
} from './src/constants';
export ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id;
});


Navigation.registerComponent(
  AUTH_SCREEN,
  () => apolloAndReduxProvider(
    component,
    store,
    client
  )
);
