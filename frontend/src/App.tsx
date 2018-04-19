import { Navigation } from 'react-native-navigation';
import ApolloAndReduxProvider from './apollo-and-redux-provider';
import {
  AUTH_SCREEN,
  TOP_SCREEN
} from './constants/screens';

import AuthScreen from './screens/Auth/Auth';
import TopScreen from './screens/Top/Top';
Navigation.registerComponent(
  AUTH_SCREEN,
  () => ApolloAndReduxProvider(
    AuthScreen
  )
);

Navigation.registerComponent(
  TOP_SCREEN,
  () => ApolloAndReduxProvider(
    TopScreen
  )
);

Navigation.startSingleScreenApp({
  screen: {
    screen: AUTH_SCREEN,
    title: "Login"
  }
})
