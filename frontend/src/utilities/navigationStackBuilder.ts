import { NavBarButtonColor } from '../constants/colors';

type StackProps = {
  stackId: string;
  screenName: string;
  props: object | undefined;
  title?: string;
  leftButton?: object;
  rightButton?: object;
  additionalOptions?: object;
};

type TopBarOptions = {
  title: string | undefined;
  leftButton: object | undefined;
  rightButton: object | undefined;
};

const buildTopBarOptions = ({ title, leftButton, rightButton }: TopBarOptions) => {
  const options = {};
  if (title) {
    options['title'] = { text: title };
  }

  if (leftButton) {
    options['leftButtons'] = [{ ...leftButton, color: NavBarButtonColor }];
  }

  if (rightButton) {
    options['rightButtons'] = [{ ...rightButton, color: NavBarButtonColor }];
  }

  return options;
};

export const buildDefaultNavigationStack = ({
  stackId,
  screenName,
  props,
  title,
  leftButton,
  rightButton,
  additionalOptions
}: StackProps): any => {
  return {
    stack: {
      id: stackId,
      children: [
        {
          component: {
            name: screenName,
            passProps: props,
            options: { ...buildTopBarOptions({ title, leftButton, rightButton }), additionalOptions }
          }
        }
      ]
    }
  };
};
