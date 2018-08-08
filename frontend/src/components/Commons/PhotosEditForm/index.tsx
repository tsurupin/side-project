import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { Photo } from "../";
import { ProjectPhoto, UserPhoto } from "../../../interfaces";
import styles from "./styles";

type Props = {
  photos: ProjectPhoto[];
  onPressPhoto: (string) => void;
  onPressNewPhoto: (rank: number) => void;
};

const renderPhotos = (photos: ProjectPhoto[], fnc) => {
  return (
    <View>
      {photos.map((photo) => {
        return <Photo key={photo.id} photo={photo} onPress={fnc} />;
      })}
    </View>
  );
};

const PhotosEditForm: React.SFC<Props> = (props) => {
  const { photos, onPressPhoto, onPressNewPhoto } = props;
  const availableRank = photos.length; 
  return (
    <View>
      {renderPhotos(photos, onPressPhoto)}
      <Button title="Add New Photo" onPress={() => onPressNewPhoto(availableRank)} />
    </View>
  );
};

export default PhotosEditForm;
