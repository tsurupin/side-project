import * as React from 'react';
import { View } from 'react-native';
import PhotoEdit from '../PhotoEdit';
import { ProjectPhoto, UserPhoto } from '../../../interfaces';
import styles from './styles';

type Props = {
  photos: ProjectPhoto[] | UserPhoto[];
  onPressPhoto: (photoId: string) => void;
  onPressNewPhoto: (rank: number) => void;
};

const CHUNK_SIZE = 3;

const renderPhotoList = (photos: ProjectPhoto[], fnc: (photoId: string) => void) => {
  return photos.map((photo, i) => {
    const hasRightEdge = i % CHUNK_SIZE === 0;
    return <PhotoEdit key={photo.id} hasRightEdge={hasRightEdge} photo={photo} onPress={fnc} />;
  });
};

const renderPhotoListGroup = (photos: JSX.Element[]) => {
  const maxChunkIndex = Math.ceil(photos.length / CHUNK_SIZE);
  const itemList: any[] = [];
  for (let i = 1; i <= maxChunkIndex; i += 1) {
    const sectionItems = photos.slice((i - 1) * CHUNK_SIZE, i * CHUNK_SIZE);
    itemList.push(renderPhotoListSection(i, sectionItems));
  }
  return itemList;
};

const renderPhotoListSection = (index: number, photos: JSX.Element[]) => {
  return (
    <View key={`photoListSection:${index}`} style={styles.listContainer}>
      {photos.map((photo) => photo)}
    </View>
  );
};

const renderNewPhoto = (availableRank: number, hasRightEdge: boolean, fnc: (rank: number) => void) => {
  return <PhotoEdit key="new" hasRightEdge={hasRightEdge} onPressNewPhoto={() => fnc(availableRank)} />;
};

const PhotosEditForm: React.SFC<Props> = (props) => {
  const { photos, onPressPhoto, onPressNewPhoto } = props;
  const availableRank = photos.length;
  const hasRightEdge = (photos.length + 1) % CHUNK_SIZE === 0;
  const photoListGroup = [
    ...renderPhotoList(photos, onPressPhoto),
    renderNewPhoto(availableRank, hasRightEdge, onPressNewPhoto)
  ];
  return <View style={styles.container}>{renderPhotoListGroup(photoListGroup)}</View>;
};

export default PhotosEditForm;
