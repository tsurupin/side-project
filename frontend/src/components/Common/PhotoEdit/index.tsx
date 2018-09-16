import * as React from "react";
import { Image, View } from "react-native";
import { Icon } from "react-native-elements";
import { UserPhoto, ProjectPhoto } from "../../../interfaces";
import {
  PLUS_CIRCLE_ICON,
  ICON_MAIN_TYPE,
  MINUS_CIRCLE_ICON
} from "../../../constants/icons";
import { ActiveMainColor } from "../../../constants/colors";
import styles from "./styles";

type Props = {
  photo?: UserPhoto | ProjectPhoto;
  hasRightEdge: boolean;
  onPress: (id?: string) => void;
};

const renderPhoto = (photo: UserPhoto | ProjectPhoto | undefined) => {
  if (photo) {
    return <Image style={styles.image} source={{ uri: photo.imageUrl }} />;
  } else {
    return <View style={styles.emptyImage}> </View>;
  }
};

const PhotoEdit: React.SFC<Props> = (props) => {
  const { photo, onPress, hasRightEdge } = props;
  const isNew = photo ? false : true;
  return (
    <View style={[styles.container, { marginRight: hasRightEdge ? 0 : 5 }]}>
      <View style={styles.innnerContainer}>{renderPhoto(photo)}</View>
      <Icon
        containerStyle={styles.icon}
        size={24}
        type={ICON_MAIN_TYPE}
        name={isNew ? PLUS_CIRCLE_ICON : MINUS_CIRCLE_ICON}
        color={ActiveMainColor}
        onPress={() => (photo ? onPress(photo.id) : onPress())}
      />
    </View>
  );
};

export default PhotoEdit;
