import { Navigation } from 'react-native-navigation';
import IconLoader from '../utilities/IconLoader';
import {
  AUTH_SCREEN,
  MATCH_SCREEN,
  USER_DISCOVERY_SCREEN,
  PROJECT_LIST_SCREEN,
  SETTING_LIST_SCREEN
} from '../constants/screens';
import { SEARCH_BUTTON, PROJECT_NEW_BUTTON } from '../constants/buttons';
import {
  CLOSE_ICON,
  FILTER_ICON,
  PENCIL_ICON,
  ACCOUNT_ICON,
  BACK_ICON,
  LIBRARY_BOOKS_ICON,
  MESSAGE_OUTLINE_ICON,
  FILTER_OUTLINE_ICON
} from '../constants/icons';
import { NavBarButtonColor } from '../constants/colors';

const navIcons = [CLOSE_ICON, FILTER_ICON, FILTER_OUTLINE_ICON, BACK_ICON];
const tabIcons = [LIBRARY_BOOKS_ICON, PENCIL_ICON, MESSAGE_OUTLINE_ICON, ACCOUNT_ICON];

const preloadTasks = [IconLoader.loadIcons(navIcons.concat(tabIcons))];

export const goToMainTabs = () => {
  Promise.all(preloadTasks).then(async () => {
    const DISCOVERY_SCREEN_STACK = {
      id: 'Discovery',
      options: {
        bottomTab: {
          text: 'Discover',
          icon: IconLoader.getIcon(LIBRARY_BOOKS_ICON)
        }
      },
      children: [
        {
          component: {
            name: USER_DISCOVERY_SCREEN,
            options: {
              topBar: {
                title: {
                  text: 'Doscovery'
                },
                leftButtons: [
                  {
                    icon: IconLoader.getIcon(FILTER_OUTLINE_ICON),
                    title: 'Search',
                    id: SEARCH_BUTTON,
                    color: NavBarButtonColor
                  }
                ]
              }
            }
          }
        }
      ]
    };

    const MATCH_SCREEN_STACK = {
      id: 'Chat',
      options: {
        bottomTab: {
          text: 'Chat',
          icon: IconLoader.getIcon(MESSAGE_OUTLINE_ICON)
        }
      },
      children: [
        {
          component: {
            name: MATCH_SCREEN,
            options: {
              topBar: {
                title: {
                  text: 'Match'
                }
              }
            }
          }
        }
      ]
    };

    const PROJECT_LIST_SCREEN_STACK = {
      id: 'Project',
      options: {
        bottomTab: {
          text: 'Project',
          icon: IconLoader.getIcon(PENCIL_ICON)
        }
      },
      children: [
        {
          component: {
            name: PROJECT_LIST_SCREEN,
            options: {
              topBar: {
                title: {
                  text: 'Projects'
                },
                rightButtons: [
                  {
                    color: NavBarButtonColor,
                    text: 'New',
                    enabled: true,
                    id: PROJECT_NEW_BUTTON
                  }
                ]
              }
            }
          }
        }
      ]
    };

    const SETTING_LIST_SCREEN_STACK = {
      id: 'Me',
      options: {
        bottomTab: {
          text: 'Me',
          icon: IconLoader.getIcon(ACCOUNT_ICON)
        }
      },
      children: [
        {
          component: {
            name: SETTING_LIST_SCREEN,
            options: {
              topBar: {
                title: {
                  text: 'Settings'
                }
              }
            }
          }
        }
      ]
    };

    const bottomTabs = {
      id: 'Tabs',
      options: {
        statusBar: {
          visible: true
        }
      },
      children: [
        {
          stack: DISCOVERY_SCREEN_STACK
        },
        {
          stack: MATCH_SCREEN_STACK
        },
        {
          stack: PROJECT_LIST_SCREEN_STACK
        },
        {
          stack: SETTING_LIST_SCREEN_STACK
        }
      ]
    };
    Navigation.setRoot({
      root: {
        bottomTabs
      }
    });
  });
};

export const goToAuthScreen = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Auth',
        children: [
          {
            component: {
              name: AUTH_SCREEN,
              passProps: {
                title: 'Login'
              },
              options: {
                topBar: {
                  title: {
                    text: 'Login'
                  }
                }
              }
            }
          }
        ]
      }
    }
  });
