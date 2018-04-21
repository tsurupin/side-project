import { Navigation } from 'react-native-navigation';
import ApolloAndReduxProvider from './apollo-and-redux-provider';
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  DISCOVERY_SCREEN
} from './constants/screens';
import { } from './constants/screens'
import AuthScreen from './screens/Auth/Auth';
import TopScreen from './screens/Top/Top';
import { DiscoveryScreen } from './screens/Discovery';
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


Navigation.registerComponent(
  DISCOVERY_SCREEN,
  () => ApolloAndReduxProvider(
    DiscoveryScreen
  )
);


Navigation.startSingleScreenApp({
  screen: {
    screen: DISCOVERY_SCREEN,
    title: "Login"
  }
})
