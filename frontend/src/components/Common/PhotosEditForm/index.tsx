import * as React from 'react';
import { View } from 'react-native';
import PhotoEdit from '../PhotoEdit';
import { ProjectPhoto, UserPhoto } from '../../../interfaces';
import styles from './styles';

type Props = {
  photos: ProjectPhoto[] | UserPhoto[];
  onPressPhoto: (string) => void;
  onPressNewPhoto: (rank: number) => void;
};

const CHUNK_SIZE = 3;

const renderPhotoList = (photos: ProjectPhoto[], fnc) => {
  return photos.map((photo, i) => {
    const hasRightEdge = i % CHUNK_SIZE === 0;
    return (
      <PhotoEdit
        hasRightEdge={hasRightEdge}
        key={photo.id}
        photo={photo}
        onPress={fnc}
      />
    );
  });
};

const renderItems = (items: any[]) => {
  const maxChunkIndex = Math.ceil(items.length / CHUNK_SIZE);
  console.log(maxChunkIndex);

  const itemList: any[] = [];
  for (let i = 1; i <= maxChunkIndex; i++) {
    const sectionItems = items.slice((i - 1) * CHUNK_SIZE, i * CHUNK_SIZE);
    itemList.push(renderPhotoListSection(i, sectionItems));
  }
  return itemList;
};

const renderPhotoListSection = (index: number, items: any[]) => {
  return (
    <View key={`photoListSection:${index}`} style={styles.listContainer}>
      {items.map((item) => item)}
    </View>
  );
};

const renderNewItem = (availableRank: number, hasRightEdge: boolean, fnc) => {
  return (
    <PhotoEdit hasRightEdge={hasRightEdge} onPress={() => fnc(availableRank)} />
  );
};

const PhotosEditForm: React.SFC<Props> = (props) => {
  const { photos, onPressPhoto, onPressNewPhoto } = props;
  const availableRank = photos.length;
  const hasRightEdge = (photos.length + 1) % CHUNK_SIZE === 0;
  const items = [
    ...renderPhotoList(photos, onPressPhoto),
    renderNewItem(availableRank, hasRightEdge, onPressNewPhoto),
  ];
  return <View style={styles.container}>{renderItems(items)}</View>;
};

export default PhotosEditForm;
