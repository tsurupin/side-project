import { Navigation } from "react-native-navigation";
import ApolloWrapper from "./appolloWrapper";
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  USER_DISCOVERY_SCREEN,
  USER_SEARCH_MODAL_SCREEN,
  SKILL_SEARCH_MODAL_SCREEN,
  USER_DETAILS_SCREEN,
  PROJECT_DETAILS_SCREEN,
  USER_EDIT_SCREEN,
  MY_PROFILE_SCREEN,
  MATCH_SCREEN,
  CHAT_SCREEN,
  LIKED_PROJECT_DETAILS_SCREEN,
  PROJECT_EDIT_SCREEN,
  MY_PROJECT_LIST_SCREEN,
  PROJECT_NEW_SCREEN,
  SETTINGS_LIST_SCREEN
} from "./constants/screens";
import AuthScreen from "./screens/Auth";
import TopScreen from "./screens/Top";

import { MatchScreen, ChatScreen } from "./screens/Match";

import {
  DiscoveryScreen,
  SearchFormScreen,
  SkillSearchModalScreen,
  UserDetailsScreen,
  ProjectDetailsScreen
} from "./screens/Discovery";

import { UserEditScreen, MyProfileScreen, SettingsListScreen } from "./screens/Me";

import {
  LikedProjectDetailsScreen,
  MyProjectListScreen,
  ProjectEditScreen,
  ProjectNewScreen
} from "./screens/Project";

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
  Navigation.registerComponent(MY_PROFILE_SCREEN, () =>
    ApolloWrapper(MyProfileScreen)
  );
  Navigation.registerComponent(USER_EDIT_SCREEN, () =>
    ApolloWrapper(UserEditScreen)
  );

  Navigation.registerComponent(MATCH_SCREEN, () => ApolloWrapper(MatchScreen));
  Navigation.registerComponent(CHAT_SCREEN, () => ApolloWrapper(ChatScreen));
  Navigation.registerComponent(PROJECT_DETAILS_SCREEN, () =>
    ApolloWrapper(ProjectDetailsScreen)
  );
  Navigation.registerComponent(PROJECT_EDIT_SCREEN, () =>
    ApolloWrapper(ProjectEditScreen)
  );
  Navigation.registerComponent(PROJECT_NEW_SCREEN, () =>
    ApolloWrapper(ProjectNewScreen)
  );

  Navigation.registerComponent(LIKED_PROJECT_DETAILS_SCREEN, () =>
    ApolloWrapper(LikedProjectDetailsScreen)
  );
  Navigation.registerComponent(MY_PROJECT_LIST_SCREEN, () =>
    ApolloWrapper(MyProjectListScreen)
  );
  Navigation.registerComponent(SETTINGS_LIST_SCREEN, () =>
    ApolloWrapper(SettingsListScreen)
  );
};

registerComponents();
//MainTab();

Navigation.startSingleScreenApp({
  screen: {
    screen: AUTH_SCREEN,
    title: "Login"
  }
});
