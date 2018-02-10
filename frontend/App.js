// import { Navigation } from 'react-native-navigation';
// import ApolloAndReduxProvider from './apollo-and-redux-provider';
// import {
//   AUTH_SCREEN
// } from './src/constants';
// import ApolloClient, { createNetworkInterface } from 'apollo-client';
//
// const networkInterface = createNetworkInterface({
//   uri: '/graphql',
//   opts: {
//     credentials: 'same-origin'
//   }
// });
// const client = new ApolloClient({
//   networkInterface,
//   dataIdFromObject: o => o.id
// });
//
// import configureStore from './src/store/configureStore';
// const store = configureStore();
//
//
//
// Navigation.registerComponent(
//   AUTH_SCREEN,
//   () => ApolloAndReduxProvider(
//     component,
//     store,
//     client
//   )
// );

import { Navigation } from 'react-native-navigation';
import ApolloAndReduxProvider from './apollo-and-redux-provider';
import {
  AUTH_SCREEN
} from './src/constants/screens';

import AuthScreen from './src/screens/Auth/Auth';
import configureStore from './src/store/configureStore';
import client from './client';
const store = configureStore();


Navigation.registerComponent(
  AUTH_SCREEN,
  () => ApolloAndReduxProvider(
    AuthScreen,
    store,
    client
  )
);

Navigation.startSingleScreenApp({
  screen: {
    screen: AUTH_SCREEN,
    title: "Login"
  }
})
