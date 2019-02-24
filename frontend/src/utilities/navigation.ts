import { Navigation } from 'react-native-navigation';
import IconLoader from './IconLoader';
import {
  AUTH_SCREEN,
  MATCH_SCREEN,
  DISCOVERY_SCREEN,
  PROJECT_LIST_SCREEN,
  SETTING_LIST_SCREEN,
  BOTTOM_TAB_ID
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
  FILTER_OUTLINE_ICON,
  CHEVRON_DOWN_ICON
} from '../constants/icons';
import { NAV_BAR_BUTTON_COLOR } from '../constants/colors';

const navIcons = [CLOSE_ICON, FILTER_ICON, FILTER_OUTLINE_ICON, BACK_ICON, CHEVRON_DOWN_ICON];
const tabIcons = [LIBRARY_BOOKS_ICON, PENCIL_ICON, MESSAGE_OUTLINE_ICON, ACCOUNT_ICON];

const preloadTasks = [IconLoader.loadIcons(navIcons.concat(tabIcons))];

export const goToMainTabs = () => {
  Promise.all(preloadTasks).then(async () => {
    const DISCOVERY_SCREEN_STACK = {
      options: {
        bottomTab: {
          text: 'Discover',
          icon: IconLoader.getIcon(LIBRARY_BOOKS_ICON)
        }
      },
      children: [
        {
          component: {
            name: DISCOVERY_SCREEN,
            options: {
              topBar: {
                title: {
                  text: 'Discovery'
                },
                leftButtons: [
                  {
                    icon: IconLoader.getIcon(FILTER_OUTLINE_ICON),
                    title: 'Search',
                    id: SEARCH_BUTTON,
                    color: NAV_BAR_BUTTON_COLOR
                  }
                ]
              }
            }
          }
        }
      ]
    };

    const MATCH_SCREEN_STACK = {
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
                    color: NAV_BAR_BUTTON_COLOR,
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
      id: BOTTOM_TAB_ID,
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

export const goToAuthScreen = async () =>
  await Navigation.setRoot({
    root: {
      stack: {
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
