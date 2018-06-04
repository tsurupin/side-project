import * as React from "react";
import styles from "./styles";
import { TouchableOpacity, Image, Text } from "react-native";
import { UserPhoto } from "../../../../interfaces";
type Props = {
  photo: UserPhoto;
  onPress: (id: string) => void;
}
const Photo = (props: Props) => {
  const { photo, onPress } = props;
  return(
    <TouchableOpacity onPress={() => onPress(photo.id)}>
      <Text>{photo.id}</Text>
      <Image source={{uri: photo.imageUrl}} />
    </TouchableOpacity>
  )

}

export default Photo;