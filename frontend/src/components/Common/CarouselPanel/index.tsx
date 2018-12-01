import * as React from 'react';
import { Image, ScrollView } from 'react-native';
import { UserPhoto } from '../../../../interfaces';
import styles from './styles';

interface Props {
  photos: UserPhoto[];
}

const renderImage = (photo: any) => {
  const { imageUrl, id } = photo;
  console.log(imageUrl);
  return (
    <Image
      key={id}
      resizeMode="cover"
      source={{ uri: imageUrl }}
      style={styles.image}
    />
  );
};
const CarouselPanel: React.SFC<Props> = (props) => {
  return (
    <ScrollView
      horizontal
      pagingEnabled={true}
      alwaysBounceHorizontal={false}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={true}
    >
      {// props.photos.map((photo) => renderImage(photo))
      [
        {
          id: 1,
          imageUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        },
        {
          id: 2,
          imageUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        },
      ].map((photo) => renderImage(photo))}
    </ScrollView>
  );
};

export default CarouselPanel;
