import * as React from 'react';
import { View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import {
  CLOSE_CIRCLE_ICON,
  ICON_MAIN_TYPE,
  MAGNIFY_ICON,
} from '../../../constants/icons';
import styles from './styles';

interface Props {
  name: string;
  onChangeText: (name) => void;
}

const SearchInput: React.SFC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search"
        leftIcon={
          <Icon
            type={ICON_MAIN_TYPE}
            name={MAGNIFY_ICON}
            size={24}
            color="black"
          />
        }
        leftIconContainerStyle={styles.leftIconContainer}
        rightIcon={
          <Icon
            type={ICON_MAIN_TYPE}
            name={CLOSE_CIRCLE_ICON}
            size={24}
            color="black"
            onPress={() => props.onChangeText('')}
          />
        }
        rightIconContainerStyle={styles.rightIconContainer}
        containerStyle={styles.inputContainer}
        inputContainerStyle={[
          styles.inputTextContainer,
          { borderBottomWidth: 0 },
        ]}
        value={props.name}
        onChangeText={(val: string) => props.onChangeText(val)}
      />
    </View>
  );
};

export default SearchInput;
