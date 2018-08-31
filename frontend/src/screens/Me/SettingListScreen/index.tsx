import * as React from "react";
import { ErrorMessage, LoadingIndicator } from "../../../components/Commons";
import { View, Button } from "react-native";
import { ListItem } from "react-native-elements";
import { UserCard } from "../../../components/Me/SettingListScreen";
import { MY_PROFILE_SCREEN } from "../../../constants/screens";
import { BACK_BUTTON, USER_EDIT_BUTTON } from "../../../constants/buttons";
import { PENCIL_ICON } from "../../../constants/icons";
import { MyUserQuery } from "../../../queries/users";
import { UserDetails } from "../../../interfaces";
import IconLoader from "../../../utilities/iconLoader";
import styles from "../../../components/Commons/SelectBox/styles";

type Item = {
  title: string;
  iconName: string;
  screen: string;
};
const SETTINS_LIST: Item[] = [];

type Props = {
  navigator: any;
};

class SettingsListScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  onPress = (screen: string) => {
    this.props.navigator.push({
      screen,
      navigatorButtons: {
        leftButtons: [
          {
            //icon: sources[1],
            title: "BACK",
            id: BACK_BUTTON
          }
        ],
        rightButtons: [
          {
            icon: IconLoader.getIcon(PENCIL_ICON),
            title: "Edit",
            id: USER_EDIT_BUTTON
          }
        ]
      }
    });
  };

  renderSettingItems() {
    return SETTINS_LIST.map((item) => {
      return (
        <ListItem
          key={item.title}
          title={item.title}
          leftIcon={{ name: item.icon }}
          onPress={() => this.onPress(item.screen)}
        />
      );
    });
  }

  render() {
    return (
      <MyUserQuery>
        {({ data, loading, error }) => {
          if (loading) return <LoadingIndicator />;
          if (error) return <ErrorMessage {...error} />;

          const myUser: UserDetails = data.myUser;
          return (
            <View>
              <UserCard
                user={myUser}
                onPress={() => this.onPress(MY_PROFILE_SCREEN)}
              />
              {this.renderSettingItems()}
            </View>
          );
        }}
      </MyUserQuery>
    );
  }
}

export default SettingsListScreen;
