import { Navigation } from "react-native-navigation";
import ApolloWrapper from "./appolloWrapper";
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  USER_DISCOVERY_SCREEN,
  USER_SEARCH_MODAL_SCREEN,
  SKILL_SEARCH_MODAL_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  PROJECT_SEARCH_MODAL_SCREEN,
  USER_DETAILS_SCREEN,
  PROJECT_DETAILS_SCREEN,
  USER_EDIT_SCREEN,
  MY_PROFILE_SCREEN,
  MATCH_SCREEN,
  CHAT_SCREEN,
  LIKED_PROJECT_DETAILS_SCREEN,
  PROJECT_EDIT_SCREEN,
  PROJECT_LIST_SCREEN,
  PROJECT_NEW_SCREEN,
  SETTING_LIST_SCREEN,
  SELECT_BOX_PICKER_SCREEN,
  TEXT_INPUT_SCREEN,
  PHOTOS_EDIT_SCREEN
} from "./constants/screens";
import AuthScreen from "./screens/Auth";
import TopScreen from "./screens/Top";

import { MatchScreen, ChatScreen } from "./screens/Match";

import {
  DiscoveryScreen,
  UserSearchModalScreen,
  ProjectSearchModalScreen,
  UserDetailsScreen,
  ProjectDetailsScreen
} from "./screens/Discovery";

import {
  UserEditScreen,
  MyProfileScreen,
  SettingListScreen
} from "./screens/Me";

import {
  LikedProjectDetailsScreen,
  ProjectListScreen,
  ProjectEditScreen,
  ProjectNewScreen
} from "./screens/Project";

import {
  TextInputScreen,
  SelectBoxPickerScreen,
  SkillSearchModalScreen,
  CitySearchModalScreen,
  PhotosEditScreen
} from "./screens/Common";

import {
  CLOSE_ICON,
  FILTER_ICON,
  FILTER_OUTLINE_ICON,
  MESSAGE_OUTLINE_ICON,
  PENCIL_ICON,
  ACCOUNT_ICON,
  LIBRARY_BOOKS_ICON,
  BACK_ICON
} from "./constants/icons";
import IconLoader from "./utilities/iconLoader";

import MainTab from "./screens/MainTab";

const registerComponents = () => {
  Navigation.registerComponent(AUTH_SCREEN, () => ApolloWrapper(AuthScreen));

  Navigation.registerComponent(TOP_SCREEN, () => ApolloWrapper(TopScreen));

  Navigation.registerComponent(USER_DISCOVERY_SCREEN, () =>
    ApolloWrapper(DiscoveryScreen)
  );
  Navigation.registerComponent(USER_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(UserSearchModalScreen)
  );

  Navigation.registerComponent(PROJECT_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(ProjectSearchModalScreen)
  );
  Navigation.registerComponent(SKILL_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(SkillSearchModalScreen)
  );

  Navigation.registerComponent(CITY_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(CitySearchModalScreen)
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
  Navigation.registerComponent(PROJECT_LIST_SCREEN, () =>
    ApolloWrapper(ProjectListScreen)
  );
  Navigation.registerComponent(SETTING_LIST_SCREEN, () =>
    ApolloWrapper(SettingListScreen)
  );

  Navigation.registerComponent(SELECT_BOX_PICKER_SCREEN, () =>
    ApolloWrapper(SelectBoxPickerScreen)
  );
  Navigation.registerComponent(TEXT_INPUT_SCREEN, () =>
    ApolloWrapper(TextInputScreen)
  );

  Navigation.registerComponent(PHOTOS_EDIT_SCREEN, () =>
    ApolloWrapper(PhotosEditScreen)
  );
};

registerComponents();

const navIcons = [CLOSE_ICON, FILTER_ICON, FILTER_OUTLINE_ICON, BACK_ICON];
const tabIcons = [
  LIBRARY_BOOKS_ICON,
  PENCIL_ICON,
  MESSAGE_OUTLINE_ICON,
  ACCOUNT_ICON
];
const preloadTasks = [IconLoader.loadIcons(navIcons.concat(tabIcons))];
Promise.all(preloadTasks).then((result) => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: AUTH_SCREEN,
      title: "Login"
    }
  });
});

console.disableYellowBox = true;
