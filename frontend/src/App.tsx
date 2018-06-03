import { Navigation } from "react-native-navigation";
import ApolloWrapper from "./appolloWrapper";
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  USER_DISCOVERY_SCREEN,
  USER_SEARCH_MODAL_SCREEN,
  SKILL_SEARCH_MODAL_SCREEN,
  USER_DETAILS_SCREEN,
  USER_EDIT_SCREEN,
  MY_PROFILE_SCREEN,
  MATCH_SCREEN,
  CHAT_SCREEN,
} from "./constants/screens";
import AuthScreen from "./screens/Auth";
import TopScreen from "./screens/Top";

import {
  MatchScreen,
  ChatScreen,
} from "./screens/Match";

import {
  DiscoveryScreen,
  SearchFormScreen,
  SkillSearchModalScreen,
  UserDetailsScreen
} from "./screens/Discovery";

import {
  UserEditScreen,
  MyProfileScreen
} from "./screens/Me";

import MainTab from "./screens/MainTab";

const registerComponents = () => {
  Navigation.registerComponent(AUTH_SCREEN, () => ApolloWrapper(AuthScreen));

  Navigation.registerComponent(TOP_SCREEN, () => ApolloWrapper(TopScreen));

  Navigation.registerComponent(USER_DISCOVERY_SCREEN, () =>
    ApolloWrapper(DiscoveryScreen)
  );
  Navigation.registerComponent(USER_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(SearchFormScreen)
  );
  Navigation.registerComponent(SKILL_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(SkillSearchModalScreen)
  );
  Navigation.registerComponent(USER_DETAILS_SCREEN, () =>
    ApolloWrapper(UserDetailsScreen)
  );
  Navigation.registerComponent(USER_EDIT_SCREEN, () =>
    ApolloWrapper(MyProfileScreen)
  );
  Navigation.registerComponent(USER_EDIT_SCREEN, () =>
    ApolloWrapper(UserEditScreen)
  );
  // Navigation.registerComponent(USER_PHOTO_EDIT_SCREEN, () =>
  //   ApolloWrapper(UserPhotoEditScreen)
  // );
  Navigation.registerComponent(MATCH_SCREEN, () =>
    ApolloWrapper(MatchScreen)
  );
  Navigation.registerComponent(CHAT_SCREEN, () =>
  ApolloWrapper(ChatScreen)
);
};

registerComponents();
//MainTab();

Navigation.startSingleScreenApp({
  screen: {
    screen: AUTH_SCREEN,
    title: "Login"
  }
})
