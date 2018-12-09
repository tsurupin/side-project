import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ICON_COLOR = 'white';
const ICON_SIZE = 32;

class IconLoader {
  icons: object;

  constructor() {
    this.icons = {} as { [key: string]: any };
  }

  private loadIcon = (name: string) => {
    return MaterialCommunityIcons.getImageSource(name, ICON_SIZE, ICON_COLOR);
  };

  public loadIcons = async (names: string[]) => {
    const tasks = names.map((name) => this.loadIcon(name));
    const results = await Promise.all(tasks);
    results.forEach((item, index) => {
      this.icons[names[index]] = item;
    });

    return this.icons;
  };

  public getIcon = (name: string) => {
    return this.icons[name];
  };
}

export default new IconLoader();
