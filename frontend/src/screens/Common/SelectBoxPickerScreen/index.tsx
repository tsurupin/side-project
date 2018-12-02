import * as React from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { CLOSE_BUTTON } from '../../../constants/buttons';

import styles from './styles';
type Item = {
  id?: string;
  name: string;
  value?: string | number;
};

type Props = {
  items: Item[];
  keyName: string;
  navigator: any;
  label: string;

  selectedValue: string | number | undefined;
  onPress: (key: string, value: string | number | undefined) => void;
};

class PickerScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent);
  }

  private handleNavigatorEvent = (e) => {
    if (e.type !== 'NavBarButtonPress') return;

    switch (e.id) {
      case CLOSE_BUTTON:
        this.props.navigator.dismissModal();
        break;
    }
  }

  private handlePress = (key: string, value: string | number) => {
    this.props.onPress(key, value);
    this.props.navigator.dismissModal();
  }

  private renderSelectedItem = () => {
    const { selectedValue, label } = this.props;

    return (
      <View style={styles.selectedItemContainer}>
        <Text style={styles.label}>{label}</Text>
        <ListItem
          title={(selectedValue || '').toString()}
          topDivider
          bottomDivider
          containerStyle={styles.itemContainer}
          titleStyle={styles.title}
        />
      </View>
    );
  }

  private renderOptionItems = () => {
    return (
      <View style={styles.optionsContainer}>
        <FlatList data={this.props.items} renderItem={this.renderItem} />
      </View>
    );
  }

  private renderItem = (data) => {
    const index = data.index;
    const { id, name, value } = data.item;

    return (
      <ListItem
        key={name}
        title={name}
        onPress={() => this.handlePress(this.props.keyName, id || value)}
        topDivider={index === 0 ? true : false}
        bottomDivider
        containerStyle={styles.itemContainer}
        titleStyle={styles.title}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSelectedItem()}
        {this.renderOptionItems()}
      </View>
    );
  }
}

export default PickerScreen;
