import { NavBarButtonColor } from '../constants/colors';

type StackProps = {
  stackId: string;
  screenName: string;
  props: object | undefined;
  title?: string;
  leftButton?: object;
  rightButton?: object;
};

type ComponentProps = {
  screenName: string;
  props: object | undefined;
  title?: string;
  leftButton?: object;
  rightButton?: object;
};

type TopBarOptions = {
  title: string | undefined;
  leftButton: object | undefined;
  rightButton: object | undefined;
};

export const buildDefaultNavigationStack = ({
  stackId,
  screenName,
  props,
  title,
  leftButton,
  rightButton
}: StackProps) => {
  return {
    stack: {
      id: stackId,
      children: [
        {
          ...buildDefaultNavigationComponent({
            screenName,
            props,
            title,
            leftButton,
            rightButton
          })
        }
      ]
    }
  };
};

export const buildDefaultNavigationComponent = ({
  screenName,
  props,
  title,
  leftButton,
  rightButton
}: ComponentProps) => {
  return {
    component: {
      name: screenName,
      passProps: props,
      options: { ...buildTopBarOptions({ title, leftButton, rightButton }) }
    }
  };
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

  return { topBar: options };
};
