import * as React from "react";
import { Image } from "react-native";


type Props = {
  imageUrl: string;
  styles: object;
};

type State = {
  imageWidth: number | undefined;
  imageHeight: number | undefined;
};

class RemoteImage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      width: undefined,
      height: undefined
    };
  }

  componentDidMount() {
    const { imageUrl } = this.props;
    Image.getSize(
      imageUrl,
      (width, height) => {
        this.setState({ width, height });
      },
      (errorMessage) => {
        console.log("imageLoad error", errorMessage);
      }
    );
  }

  render() {
    const { imageUrl, styles } = this.props;
    return (
      <Image
        style={[styles, this.state]}
        source={{
          uri: imageUrl
        }}
      />
    );
  }
}

export default RemoteImage;
