import * as React from 'react';
import { View } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import {
  ICON_MAIN_TYPE,
  SMALL_ICON_SIZE,
  ICON_BLACK_COLOR,
  CLOSE_CIRCLE_ICON,
  MAGNIFY_ICON
} from '../../../constants/icons';
import styles from './styles';

type Props = {
  name: string;
  onChangeText: (val: string) => void;
};

const SearchInput: React.SFC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder="Search"
        leftIcon={<Icon type={ICON_MAIN_TYPE} name={MAGNIFY_ICON} size={SMALL_ICON_SIZE} color={ICON_BLACK_COLOR} />}
        leftIconContainerStyle={styles.leftIconContainer}
        rightIcon={
          <Icon
            type={ICON_MAIN_TYPE}
            name={CLOSE_CIRCLE_ICON}
            size={SMALL_ICON_SIZE}
            color={ICON_BLACK_COLOR}
            onPress={() => props.onChangeText('')}
          />
        }
        rightIconContainerStyle={styles.rightIconContainer}
        containerStyle={styles.inputContainer}
        inputContainerStyle={[styles.inputTextContainer, { borderBottomWidth: 0 }]}
        value={props.name}
        onChangeText={(val: string) => props.onChangeText(val)}
      />
    </View>
  );
};

export default SearchInput;
