import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  MATCH_SCREEN,
  USER_DISCOVERY_SCREEN,
  MY_PROFILE_SCREEN,
  PROJECT_LIST_SCREEN,
  SETTING_LIST_SCREEN
} from "../../constants/screens";
import { SEARCH_BUTTON, USER_EDIT_BUTTON, PROJECT_NEW_BUTTON } from "../../constants/buttons";
import IconLoader from "../../utilities/iconLoader";
import { LIBRARY_BOOKS_ICON, MESSAGE_OUTLINE_ICON, PENCIL_ICON, ACCOUNT_ICON, FILTER_OUTLINE_ICON } from "../../constants/icons";
import { TabMainColor, TabLabelColor, TabButtonColor } from "../../constants/colors";

const MainTab = () => {
  Promise.all([
    Icon.getImageSource("md-map", 30),
    Icon.getImageSource("filter-outline", 30),
    Icon.getImageSource("ios-share-alt", 30),
    Icon.getImageSource("ios-menu", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabsStyle: {
        tabBarButtonColor: TabButtonColor,
        tabBarLabelColor: TabLabelColor,
        tabBackgroundColor: TabMainColor,
      },
      tabs: [
        {
          screen: USER_DISCOVERY_SCREEN,
          label: "Discovery",
          title: "Discovery",
          icon: IconLoader.getIcon(LIBRARY_BOOKS_ICON),
          navigatorButtons: {
            leftButtons: [
              {
                icon: IconLoader.getIcon(FILTER_OUTLINE_ICON),
                title: "Search",
                id: SEARCH_BUTTON
              }
            ]
          }
        },
        {
          screen: MATCH_SCREEN,
          label: "Match",
          title: "Match",
          icon: IconLoader.getIcon(MESSAGE_OUTLINE_ICON),
        },
        {
          screen: PROJECT_LIST_SCREEN,
          label: "ProjectList",
          title: "ProjectList",
          icon: IconLoader.getIcon(PENCIL_ICON),
          navigatorButtons: {
            rightButtons: [
              {
                icon: IconLoader.getIcon(PENCIL_ICON),
                title: "New",
                id: PROJECT_NEW_BUTTON
              }
             ]
           }
          
        },
        {
          screen: SETTING_LIST_SCREEN,
          label: "Settings",
          title: "Settings",
          icon: IconLoader.getIcon(ACCOUNT_ICON)
        }
        // {
        //   screen: MY_PROFILE_SCREEN,
        //   label: "MyProfile",
        //   title: "MyProfile",
        //   icon: IconLoader.getIcon(ACCOUNT_ICON),
        //   navigatorButtons: {
        //     rightButtons: [
        //       {
        //         icon: IconLoader.getIcon(PENCIL_ICON),
        //         title: "Edit",
        //         id: USER_EDIT_BUTTON
        //       }
        //     ]
        //   }
        // }
      ],
      drawer: {}
    });
  });
};

export default MainTab;
