import * as React from "react";
import styles from "./styles";
import { TouchableOpacity, Image, Text } from "react-native";
import { UserPhoto, ProjectPhoto } from "../../../../interfaces";
type Props = {
  photo: UserPhoto | ProjectPhoto;
  onPress: (id: string) => void;
}
const Photo: React.SFC<Props> = props  => {
  const { photo, onPress } = props;
  return(
    <TouchableOpacity onPress={() => onPress(photo.id)}>
      <Text>{photo.id}</Text>
      <Image source={{uri: photo.imageUrl}} />
    </TouchableOpacity>
  )

}

export default Photo;