import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  MATCH_SCREEN,
  USER_DISCOVERY_SCREEN,
  MY_PROFILE_SCREEN,
  MY_PROJECT_LIST_SCREEN
} from "../../constants/screens";
import { USER_SEARCH_BUTTON, USER_EDIT_BUTTON, PROJECT_NEW_BUTTON } from "../../constants/buttons";
const MainTab = () => {
  Promise.all([
    Icon.getImageSource("md-map", 30),
    Icon.getImageSource("filter-outline", 30),
    Icon.getImageSource("ios-share-alt", 30),
    Icon.getImageSource("ios-menu", 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: USER_DISCOVERY_SCREEN,
          label: "Discovery",
          title: "Discovery",
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[1],
                title: "Search",
                id: USER_SEARCH_BUTTON
              }
            ]
          }
        },
        {
          screen: MATCH_SCREEN,
          label: "Match",
          title: "Match",
          icon: sources[1]
        },
        {
          screen: MY_PROJECT_LIST_SCREEN,
          label: "MyProjectList",
          title: "MyProjectList",
          icon: sources[2],
          navigatorButtons: {
            rightButtons: [
              {
                title: "New",
                id: PROJECT_NEW_BUTTON
              }
            ]
          }

        },
        {
          screen: MY_PROFILE_SCREEN,
          label: "MyProfile",
          title: "MyProfile",
          icon: sources[2],
          navigatorButtons: {
            rightButtons: [
              {
                title: "Edit",
                id: USER_EDIT_BUTTON
              }
            ]
          }
        }
      ],
      drawer: {}
    });
  });
};

export default MainTab;
