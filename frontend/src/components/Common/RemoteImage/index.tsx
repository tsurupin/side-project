import * as React from 'react';
import { Image } from 'react-native';

interface Props {
  imageUrl: string;
  styles: object;
}

interface State {
  imageWidth: number;
  imageHeight: number;
}

class RemoteImage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  public componentDidMount() {
    const { imageUrl } = this.props;
    Image.getSize(
      imageUrl,
      (width, height) => {
        this.setState({ width, height });
      },
      (errorMessage) => {
        console.log('imageLoad error', errorMessage);
      },
    );
  }

  public render() {
    const { imageUrl, styles } = this.props;
    return (
      <Image
        style={[styles, this.state]}
        resizeMode="contain"
        source={{
          uri: imageUrl,
        }}
      />
    );
  }
}

export default RemoteImage;
