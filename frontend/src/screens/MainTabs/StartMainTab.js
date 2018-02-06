import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { AUTH_SCREEN } from '../../constants/screens';

const startTabs = () => {
  Promise.all([
    Icon.getImageSource('md-map', 30),
    Icon.getImageSource('ios-share-alt', 30),
    Icon.getImageSource('ios-menu', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [

      ],
      drawer: {

      }
    })
  })
}


export default startTabs;
