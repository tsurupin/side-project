import { Navigation } from 'react-native-navigation';
import ApolloWrapper from './AppolloWrapper';
import {
  INITIALIZE_SCREEN,
  AUTH_SCREEN,
  DISCOVERY_SCREEN,
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
} from './constants/screens';
import InitializeScreen from './screens/Initialize';
import AuthScreen from './screens/Auth';
import { MatchScreen, ChatScreen } from './screens/Match';

import {
  DiscoveryScreen,
  UserSearchModalScreen,
  ProjectSearchModalScreen,
  UserDetailsScreen,
  ProjectDetailsScreen
} from './screens/Discovery';

import { UserEditScreen, MyProfileScreen, SettingListScreen } from './screens/Me';

import { LikedProjectDetailsScreen, ProjectListScreen, ProjectEditScreen, ProjectNewScreen } from './screens/Project';

import {
  TextInputScreen,
  SelectBoxPickerScreen,
  SkillSearchModalScreen,
  CitySearchModalScreen,
  PhotosEditScreen
} from './screens/Common';

import {
  NAV_BAR_BACKGROUND_COLOR,
  TAB_BAR_BUTTON_COLOR,
  TAB_BAR_BACKGROUND_COLOR,
  NOTIFICATION_BADGE_COLOR,
  TAB_BAR_SELECTED_LABEL_COLOR,
  TAB_BAR_SELECTED_BUTTON_COLOR,
  NAV_BAR_TEXT_COLOR
} from './constants/colors';

export const registerComponents = () => {
  Navigation.registerComponent(INITIALIZE_SCREEN, () => ApolloWrapper(InitializeScreen));
  Navigation.registerComponent(AUTH_SCREEN, () => ApolloWrapper(AuthScreen));

  Navigation.registerComponent(DISCOVERY_SCREEN, () => ApolloWrapper(DiscoveryScreen));
  Navigation.registerComponent(USER_SEARCH_MODAL_SCREEN, () => ApolloWrapper(UserSearchModalScreen));

  Navigation.registerComponent(PROJECT_SEARCH_MODAL_SCREEN, () => ApolloWrapper(ProjectSearchModalScreen));
  Navigation.registerComponent(SKILL_SEARCH_MODAL_SCREEN, () => ApolloWrapper(SkillSearchModalScreen));

  Navigation.registerComponent(CITY_SEARCH_MODAL_SCREEN, () => ApolloWrapper(CitySearchModalScreen));
  Navigation.registerComponent(USER_DETAILS_SCREEN, () => ApolloWrapper(UserDetailsScreen));
  Navigation.registerComponent(MY_PROFILE_SCREEN, () => ApolloWrapper(MyProfileScreen));
  Navigation.registerComponent(USER_EDIT_SCREEN, () => ApolloWrapper(UserEditScreen));

  Navigation.registerComponent(MATCH_SCREEN, () => ApolloWrapper(MatchScreen));
  Navigation.registerComponent(CHAT_SCREEN, () => ApolloWrapper(ChatScreen));
  Navigation.registerComponent(PROJECT_DETAILS_SCREEN, () => ApolloWrapper(ProjectDetailsScreen));
  Navigation.registerComponent(PROJECT_EDIT_SCREEN, () => ApolloWrapper(ProjectEditScreen));
  Navigation.registerComponent(PROJECT_NEW_SCREEN, () => ApolloWrapper(ProjectNewScreen));

  Navigation.registerComponent(LIKED_PROJECT_DETAILS_SCREEN, () => ApolloWrapper(LikedProjectDetailsScreen));
  Navigation.registerComponent(PROJECT_LIST_SCREEN, () => ApolloWrapper(ProjectListScreen));
  Navigation.registerComponent(SETTING_LIST_SCREEN, () => ApolloWrapper(SettingListScreen));

  Navigation.registerComponent(SELECT_BOX_PICKER_SCREEN, () => ApolloWrapper(SelectBoxPickerScreen));
  Navigation.registerComponent(TEXT_INPUT_SCREEN, () => ApolloWrapper(TextInputScreen));

  Navigation.registerComponent(PHOTOS_EDIT_SCREEN, () => ApolloWrapper(PhotosEditScreen));
};

registerComponents();

export const launchApp = () => {
  // Promise.all(IconLoader.loadIcons([BACK_ICON]).then(() => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      bottomTab: {
        iconColor: TAB_BAR_BUTTON_COLOR,
        selectedIconColor: TAB_BAR_SELECTED_BUTTON_COLOR,
        textColor: TAB_BAR_BUTTON_COLOR,
        selectedTextColor: TAB_BAR_SELECTED_LABEL_COLOR,
        fontSize: 12,
        badgeColor: NOTIFICATION_BADGE_COLOR
      },
      layout: {
        orientation: ['portrait']
      },
      bottomTabs: {
        visible: true,
        currentTabIndex: 0,
        titleDisplayMode: 'alwaysShow',
        backgroundColor: TAB_BAR_BACKGROUND_COLOR
      },
      statusBar: {
        visible: true,
        style: 'light'
      },
      topBar: {
        visible: true,
        animate: false,
        buttonColor: TAB_BAR_BUTTON_COLOR,
        testID: 'topBar',
        background: {
          color: NAV_BAR_BACKGROUND_COLOR
        },
        title: {
          fontSize: 16,
          color: NAV_BAR_TEXT_COLOR,
          fontFamily: 'Helvetica'
        }
        // backButton: {
        //   icon: IconLoader.getIcon(BACK_ICON),
        //   visible: true,
        //   tintColor: NavBarButtonColor,
        //   id: BACK_BUTTON
        // }
      }
    });
    Navigation.setRoot({
      root: {
        component: {
          name: INITIALIZE_SCREEN
        }
      }
    });
  });
  // });
};

launchApp();

console.disableYellowBox = true;
