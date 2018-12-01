import { Navigation } from 'react-native-navigation';
import appolloWrapper from './appolloWrapper';
import {
  AUTH_SCREEN,
  CHAT_SCREEN,
  CITY_SEARCH_MODAL_SCREEN,
  LIKED_PROJECT_DETAILS_SCREEN,
  MATCH_SCREEN,
  MY_PROFILE_SCREEN,
  PHOTOS_EDIT_SCREEN,
  PROJECT_DETAILS_SCREEN,
  PROJECT_EDIT_SCREEN,
  PROJECT_LIST_SCREEN,
  PROJECT_NEW_SCREEN,
  PROJECT_SEARCH_MODAL_SCREEN,
  SELECT_BOX_PICKER_SCREEN,
  SETTING_LIST_SCREEN,
  SKILL_SEARCH_MODAL_SCREEN,
  TEXT_INPUT_SCREEN,
  TOP_SCREEN,
  USER_DETAILS_SCREEN,
  USER_DISCOVERY_SCREEN,
  USER_EDIT_SCREEN,
  USER_SEARCH_MODAL_SCREEN,
} from './constants/screens';
import Auth from './screens/Auth';
// import TopScreen from "./screens/Top";

import { ChatScreen, MatchScreen } from './screens/Match';

import {
  DiscoveryScreen,
  ProjectDetailsScreen,
  ProjectSearchModalScreen,
  UserDetailsScreen,
  UserSearchModalScreen,
} from './screens/Discovery';

import {
  MyProfileScreen,
  SettingListScreen,
  UserEditScreen,
} from './screens/Me';

import {
  LikedProjectDetailsScreen,
  ProjectEditScreen,
  ProjectListScreen,
  ProjectNewScreen,
} from './screens/Project';

import {
  CitySearchModalScreen,
  PhotosEditScreen,
  SelectBoxPickerScreen,
  SkillSearchModalScreen,
  TextInputScreen,
} from './screens/Common';

import {
  ACCOUNT_ICON,
  BACK_ICON,
  CLOSE_ICON,
  FILTER_ICON,
  FILTER_OUTLINE_ICON,
  LIBRARY_BOOKS_ICON,
  MESSAGE_OUTLINE_ICON,
  PENCIL_ICON,
} from './constants/icons';
import iconLoader from './utilities/iconLoader';

const registerComponents = () => {
  Navigation.registerComponent(AUTH_SCREEN, () => ApolloWrapper(AuthScreen));

  // Navigation.registerComponent(TOP_SCREEN, () => ApolloWrapper(TopScreen));

  Navigation.registerComponent(USER_DISCOVERY_SCREEN, () =>
    ApolloWrapper(DiscoveryScreen),
  );
  Navigation.registerComponent(USER_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(UserSearchModalScreen),
  );

  Navigation.registerComponent(PROJECT_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(ProjectSearchModalScreen),
  );
  Navigation.registerComponent(SKILL_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(SkillSearchModalScreen),
  );

  Navigation.registerComponent(CITY_SEARCH_MODAL_SCREEN, () =>
    ApolloWrapper(CitySearchModalScreen),
  );
  Navigation.registerComponent(USER_DETAILS_SCREEN, () =>
    ApolloWrapper(UserDetailsScreen),
  );
  Navigation.registerComponent(MY_PROFILE_SCREEN, () =>
    ApolloWrapper(MyProfileScreen),
  );
  Navigation.registerComponent(USER_EDIT_SCREEN, () =>
    ApolloWrapper(UserEditScreen),
  );

  Navigation.registerComponent(MATCH_SCREEN, () => ApolloWrapper(MatchScreen));
  Navigation.registerComponent(CHAT_SCREEN, () => ApolloWrapper(ChatScreen));
  Navigation.registerComponent(PROJECT_DETAILS_SCREEN, () =>
    ApolloWrapper(ProjectDetailsScreen),
  );
  Navigation.registerComponent(PROJECT_EDIT_SCREEN, () =>
    ApolloWrapper(ProjectEditScreen),
  );
  Navigation.registerComponent(PROJECT_NEW_SCREEN, () =>
    ApolloWrapper(ProjectNewScreen),
  );

  Navigation.registerComponent(LIKED_PROJECT_DETAILS_SCREEN, () =>
    ApolloWrapper(LikedProjectDetailsScreen),
  );
  Navigation.registerComponent(PROJECT_LIST_SCREEN, () =>
    ApolloWrapper(ProjectListScreen),
  );
  Navigation.registerComponent(SETTING_LIST_SCREEN, () =>
    ApolloWrapper(SettingListScreen),
  );

  Navigation.registerComponent(SELECT_BOX_PICKER_SCREEN, () =>
    ApolloWrapper(SelectBoxPickerScreen),
  );
  Navigation.registerComponent(TEXT_INPUT_SCREEN, () =>
    ApolloWrapper(TextInputScreen),
  );

  Navigation.registerComponent(PHOTOS_EDIT_SCREEN, () =>
    ApolloWrapper(PhotosEditScreen),
  );
};

registerComponents();

const navIcons = [CLOSE_ICON, FILTER_ICON, FILTER_OUTLINE_ICON, BACK_ICON];
const tabIcons = [
  LIBRARY_BOOKS_ICON,
  PENCIL_ICON,
  MESSAGE_OUTLINE_ICON,
  ACCOUNT_ICON,
];
const preloadTasks = [IconLoader.loadIcons(navIcons.concat(tabIcons))];
Promise.all(preloadTasks).then((result) => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: AUTH_SCREEN,
      title: 'Login',
    },
  });
});

console.disableYellowBox = true;
