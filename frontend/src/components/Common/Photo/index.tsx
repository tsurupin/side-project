import * as React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { ProjectPhoto, UserPhoto } from '../../../interfaces';
import styles from './styles';
interface Props {
  photo: UserPhoto | ProjectPhoto;
  onPress: (id: string) => void;
}
const Photo: React.SFC<Props> = (props) => {
  const { photo, onPress } = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(photo.id)}
    >
      <Image style={styles.image} source={{ uri: photo.imageUrl }} />
    </TouchableOpacity>
  );
};

export default Photo;
