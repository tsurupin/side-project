import * as React from "react";
import { View } from "react-native";
import { Photo } from "../";

import styles from "./styles";


type Props = {
  photos: UserPhoto[] || ProjectPhoto[];
  onPressPhoto: (string) => void;
  onPressNewPhoto: () => void

}

const PhotosEditForm: React.SFC<Props> = props => {
  const { photos, onPressPhoto, onPressNewPhoto } = props;

  return (
    <View>
      <View>
        {photos.map((photo) => {
          return (
             <Photo
              key={photo.id}
              photo={photo}
              onPress={(id: string) => onPressPhoto(id)}
            />
          )
        })}
      </View>
      <View>
        <Button
          title="Add New Photo"
          onPress={() => onPressNewPhoto()}
         />
      </View>
    </View>

  )
}

export default PhotosEditForm;