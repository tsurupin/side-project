import ImagePicker from 'react-native-image-picker';
import * as ImageResizer from 'react-native-image-resizer';
import { ReactNativeFile } from '@richeterre/apollo-upload-client';

type Props = {
  variables: object;
  onCallback: (object: any) => void;
  onError: (message: string) => void;
};

export const uploadImage = (props: Props) => {
  const { variables, onCallback, onError } = props;
  ImagePicker.showImagePicker({}, async (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      onError('User cancelled image picker');
    } else if (response.error) {
      onError(`ImagePicker Error: ${response.error}`);
    } else if (response.customButton) {
      onError(`User tapped custom button: ${response.customButton}`);
    } else {
      try {
        const uri = await ImageResizer.createResizedImage(response.uri, 600, 600, 'JPEG', 100);
        const photo = new ReactNativeFile({
          uri,
          type: 'image/jpeg',
          name: 'photo.jpg'
        });

        onCallback({ variables: { ...variables, photo } });
      } catch (err) {
        onError('Unable to resize the photo, Check the console for full the error message');
      }
    }
  });
};
