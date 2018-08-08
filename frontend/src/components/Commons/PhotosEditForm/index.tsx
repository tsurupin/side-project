import * as React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { Photo } from "../";
import { ProjectPhoto, UserPhoto } from "../../../interfaces";
import styles from "./styles";

type Props = {
  photos: ProjectPhoto[];
  onPressPhoto: (string) => void;
  onPressNewPhoto: () => void;
};

const renderPhotos = (photos: ProjectPhoto[], fnc) => {
  return(
    <View>
      {photos.map(photo => {
      return(
        <Photo
          key={photo.id}
          photo={photo}
          onPress={fnc}
      />
      )
    })}
    </View>
  )
};

const PhotosEditForm: React.SFC<Props> = (props) => {
  const { photos, onPressPhoto, onPressNewPhoto } = props;

  return (
    <View>
        {renderPhotos(photos, onPressPhoto)}
       <Button title="Add New Photo" onPress={() => onPressNewPhoto()} />      
    </View>
  );
};

export default PhotosEditForm;
