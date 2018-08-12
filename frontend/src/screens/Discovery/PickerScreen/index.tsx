import * as React from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { CLOSE_BUTTON } from "../../../constants/buttons";

import styles from "./styles";
type Item = {
  id?: string;
  name: string;
  value?: string | number;
}

type Props = {
  items: Item[];
  keyName: string;
  navigator: any;
  selectedValue: string | number | undefined;
  onPress: (key:string, value: string | number | undefined) => void;
}

class PickerScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent= (e) => {
    if (e.type !== "NavBarButtonPress") return;

    console.log(e);
    switch (e.id) {
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  }

  private isSelectedItem = (value: string | number) : boolean => {
    const { selectedValue } = this.props;
    if (selectedValue !== value) return false;
    return true;
  }

  private handlePress = (key: string, value: string | number) => {
    this.props.onPress(key, value);
    this.props.navigator.dismissModal();
  }

  private renderItem = (data) => {
    const { id, name, value } = data.item;

    return (
      <ListItem
        key={name}
        title={name}
        onPress={() => this.handlePress(this.props.keyName, id || value)}
        chevron={this.isSelectedItem(id || value)}
        bottomDivider
      />
    )
  }

  render() {
    return(
      <FlatList
        data={this.props.items}
        renderItem={this.renderItem}
      />
    )
  }
}

export default PickerScreen;