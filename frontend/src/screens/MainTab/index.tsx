import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  AUTH_SCREEN,
  TOP_SCREEN,
  DISCOVERY_SCREEN
} from '../../constants/screens';

const MainTab = () => {
  Promise.all([
    Icon.getImageSource('md-map', 30),
    Icon.getImageSource('filter-outline', 30),
    Icon.getImageSource('ios-share-alt', 30),
    Icon.getImageSource('ios-menu', 30)
  ]).then(sources => {
  
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: DISCOVERY_SCREEN,
          label: "Discovery",
          title: "Discovery",
          icon: sources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[1],
                title: "SearchFilter",
                id: "FilterButton"
              }
            ]
          }
        },
      {
        screen: TOP_SCREEN,
          label: "Top",
          title: "Top",
          icon: sources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: sources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
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
      drawer: {

      }
    })
  })
}


export default MainTab;
