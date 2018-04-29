import { Navigation } from 'react-native-navigation';
import ApolloApp from './apolloApp';
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  DISCOVERY_SCREEN,
  FILTER_FORM_SCREEN,
  SKILL_SEARCH_FORM_SCREEN
} from './constants/screens';
import { } from './constants/screens'
import AuthScreen from './screens/Auth/Auth';
import TopScreen from './screens/Top/Top';
import { 
  DiscoveryScreen, 
  FilterFormScreen,
  SkillSearchFormScreen 
} from './screens/Discovery';

import launchMainTab from './screens/launchMainTab'

const registerComponents = () => {
  Navigation.registerComponent(
    AUTH_SCREEN,
    () => ApolloApp(AuthScreen)
  );
  
  Navigation.registerComponent(
    TOP_SCREEN,
    () => ApolloApp(TopScreen)
  );
  
  Navigation.registerComponent(
    DISCOVERY_SCREEN,
    () => ApolloApp(DiscoveryScreen)
  );
  Navigation.registerComponent(
    FILTER_FORM_SCREEN,
    () => ApolloApp(FilterFormScreen)
  );
  Navigation.registerComponent(
    SKILL_SEARCH_FORM_SCREEN,
    () => ApolloApp(SkillSearchFormScreen)
  )
}

registerComponents();
launchMainTab();




// Navigation.startSingleScreenApp({
//   screen: {
//     screen: DISCOVERY_SCREEN,
//     title: "Login"
//   }
// })
