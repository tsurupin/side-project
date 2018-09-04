import * as React from "react";
import SegmentedControlTab from "react-native-segmented-control-tab";
import styles from "./styles";

type Props = {
  selectedIndex: number;
  onTabPress: (number) => void;
  borderRadius: number;
  values: number[] | string[];
}

const CustomizedSegmentedControlTab: React.SFC<Props> = (props) => {
  const { selectedIndex, borderRadius, values, onTabPress} = props;
  return(
    <SegmentedControlTab
          values={values}
          borderRadius={borderRadius}
          selectedIndex={selectedIndex}
          onTabPress={onTabPress}
          tabContainerStyle={styles.tabContainerStyle}
          tabStyle={styles.tabStyle}
          tabTextStyle={styles.tabTextStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
        />
  )
}

export default CustomizedSegmentedControlTab;