import * as React from "react";
import { View, Button } from "react-native";
import { MY_PROFILE_SCREEN } from "../../../constants/screens";
import { BACK_BUTTON } from "../../../constants/buttons";

type Item = {
  title: string;
  screen: string;
};
const SETTINS_LIST: Item[] = [
  { title: "See MyProfile", screen: MY_PROFILE_SCREEN }
];

type Props = {
  navigator: any;
};

class SettingsListScreen extends React.Component<Props> {
  handlePress = (screen: string) => {
    switch (screen) {
      case MY_PROFILE_SCREEN:
        this.props.navigator.push({
          screen,
          navigatorButtons: {
            leftButtons: [
              {
                //icon: sources[1],
                title: "Back",
                id: BACK_BUTTON
              }
            ]
          }
        });
    }
  };

  private renderList = () => {
    return (
      <View>
        {SETTINS_LIST.map(item => {
          return (
            <Button
              title={item.title}
              key={item.title}
              onPress={() => this.handlePress(item.screen)}
            />
          );
        })}
      </View>
    );
  };
  render() {
    return this.renderList();
  }
}

export default SettingsListScreen;
