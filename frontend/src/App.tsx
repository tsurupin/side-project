import { Navigation } from 'react-native-navigation';
import ApolloWrapper from './appolloWrapper';
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  DISCOVERY_SCREEN,
  FILTER_FORM_SCREEN,
  SKILL_SEARCH_MODAL_SCREEN
} from './constants/screens';
import { } from './constants/screens'
import AuthScreen from './screens/Auth';
import TopScreen from './screens/Top';
import { 
  DiscoveryScreen, 
  SearchFormScreen,
  SkillSearchModalScreen 
} from './screens/Discovery';

import MainTab from './screens/MainTab'

const registerComponents = () => {
  Navigation.registerComponent(
    AUTH_SCREEN,
    () => ApolloWrapper(AuthScreen)
  );
  
  Navigation.registerComponent(
    TOP_SCREEN,
    () => ApolloWrapper(TopScreen)
  );
  
  Navigation.registerComponent(
    DISCOVERY_SCREEN,
    () => ApolloWrapper(DiscoveryScreen)
  );
  Navigation.registerComponent(
    FILTER_FORM_SCREEN,
    () => ApolloWrapper(SearchFormScreen)
  );
  Navigation.registerComponent(
    SKILL_SEARCH_MODAL_SCREEN,
    () => ApolloWrapper(SkillSearchModalScreen)
  )
}

registerComponents();
MainTab();




// Navigation.startSingleScreenApp({
//   screen: {
//     screen: DISCOVERY_SCREEN,
//     title: "Login"
//   }
// })
