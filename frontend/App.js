import { Navigation } from 'react-native-navigation';
import ApolloAndReduxProvider from './apollo-and-redux-provider';
import {
  AUTH_SCREEN,
  TOP_SCREEN
} from './src/constants/screens';

import AuthScreen from './src/screens/Auth/Auth';
import TopScreen from './src/screens/Top/Top';
import configureStore from './src/store/configureStore';
const store = configureStore();


Navigation.registerComponent(
  AUTH_SCREEN,
  () => ApolloAndReduxProvider(
    AuthScreen,
    store
  )
);

Navigation.registerComponent(
  TOP_SCREEN,
  () => ApolloAndReduxProvider(
    TopScreen,
    store
  )
);

Navigation.startSingleScreenApp({
  screen: {
    screen: AUTH_SCREEN,
    title: "Login"
  }
})
