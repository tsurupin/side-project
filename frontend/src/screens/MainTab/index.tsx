import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  MATCH_SCREEN,
  USER_DISCOVERY_SCREEN
} from "../../constants/screens";
import { USER_SEARCH_BUTTON } from "../../constants/buttons";
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
          screen: TOP_SCREEN,
          label: "Top",
          title: "Top",
          icon: sources[2],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
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
